const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
var CryptoJS = require("crypto-js");
const getSecretsFromAwsSecretManager = require("./utils/getSecrets.js");
const logger = require("./utils/logger.js");

dotenv.config();
app.use(express.json());
app.use(cors());

const { User } = require("./models/UserModel");

// console.log(getSecretsFromAwsSecretManager("MONGO_URI"))
//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  if (req.originalUrl === "/api/users/login") {
    logger.info("Surpass JWT for login");
    return next();
  }

  const header = req.headers["authorization"];
  logger.debug("Header of request is " + header);

  if (header === undefined || header === null) {
    logger.warn("header is undefined, JWT Missing");
    return res.status(403).json({ msg: "unauthorized" });
  }

  if (typeof header === "string") {
    const bearer = header.split(" ");
    const token = bearer[1];
    logger.debug("Token of request is " + token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authorizedData) => {

      if(err){
        logger.info("Could not connect to the protected route");
        logger.error("Error is " + err);
        res.sendStatus(403);
      }

      else if(authorizedData === undefined){
        logger.error("user data not found while verifying JWT")
        return res.status(403).json({ msg: "data not found" }); 
      } 

      else if(req.body["userName"] === authorizedData.name){
        req.token = token;
        logger.info("User " + authorizedData.name + " authenticated");
        return next();
      }

      else{
        logger.warn("User " + authorizedData.name + " dose not have access to this data!");
        return res.status(403).json({ msg: "unauthorizedAccess" });
      }

    });
  }
};


app.use(checkToken);

app.get("/api/", async (req, res) => {
  return res.json({ msg: "hello crowdContract user" });
});

app.post("/api/users/login", async (req, res) => {
  const name = req.body["name"];
  const password = req.body["password"];

  await User.findOne({ name: name })
    .exec()
    .then((user) => {
      if (user === null) {
        logger.error("Login failed for user: " + name);
        return res.status(401).json({ msg: "user not found" });
      }
      //implement jwt
      if (name === user.name) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            logger.info("Successfully logged in user: " + name);
            const jwtoken = jwt.sign(
              { name: user.name },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            // console.log("jwt", jwtoken);
            var ciphertext = CryptoJS.AES.encrypt(
              JSON.stringify({ user: user }),
              process.env.AES_SECRET_KEY
            ).toString();
            return res
              .status(200)
              .json({ msg: "loginSuccess", jwt: jwtoken, user: ciphertext });
          } else {
            // JSON.stringify({msg: "invalid username or password"});
            logger.error("Invalid username or password: " + name);
            return res.status(401).json({ msg: "invalidAuth" });
          }
        });
      }
    });
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json({ msg: "success", data: allUsers });
});

app.post("/api/users/getUser", async (req, res) => {
  const userName = req.body.userName;
  try {
    const user = await User.findOne({ name: userName });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ msg: "userNotFound" });
  }
});

app.post("/api/users/getPremium", async (req, res) => {

  let user = await User.findOneAndUpdate(
    { name: req.body["userName"] },
    { isPremium: true }
  )
    console.log(user);
    var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify({ user: user }),
    process.env.AES_SECRET_KEY
  ).toString();

  return res
    .status(200)
    .json({ msg: "success", user: ciphertext });

});

app.post("/api/users/add", async (req, res) => {
  const newUser = new User({ ...req.body });
  const savedUser = await newUser.save();
  return res.status(201).json({ msg: "success", data: savedUser });
});

app.put("/api/users/update/:id", async (req, res) => {
  const { id } = req.params;
  await User.updateOne({ id }, req.body);
  const updatedUser = await User.findById(id);
  return res.status(200).json({ msg: "success", data: updatedUser });
});

app.delete("/api/users/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  return res.status(200).json({ msg: "success", data: deletedUser });
});

const startServer = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(
        app.listen(process.env.PORT, () =>
          console.log(`Server started on port ${process.env.PORT}`)
        )
      );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

startServer();
module.exports = app;
