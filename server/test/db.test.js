const mongoose = require("mongoose");
const { User } = require("server/models/UserModel.js");
const logger = require("../utils/logger");
const dotenv = require("dotenv");
dotenv.config();

const userData = {
  phone_number: {
    countryCode: "91",
    number: "6361192712",
  },
  name: "Prathviraj B N",
  isPremium: true,
  password: "12345",
};

describe("User Model Tests", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI + "/crowdContractTest" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 70000);

  it("should create a new user", async () => {
    const user = await User.create(userData);

    expect(user).toBeDefined();
    expect(user.phone_number.countryCode).toBe(
      userData.phone_number.countryCode
    );
    expect(user.phone_number.number).toBe(userData.phone_number.number);
    expect(user.name).toBe(userData.name);
    expect(user.isPremium).toBe(userData.isPremium);
    expect(user.password).toBe(userData.password);
    logger.test("Create-User operation successful");
  }, 70000);

  it("should retrieve a user by phone number", async () => {
    const existingUser = {
      ...userData,
      phone_number: {
        countryCode: "91",
        number: "6361192712",
      },
    };

    await User.create(existingUser);

    const foundUser = await User.findOne({
      "phone_number.countryCode": existingUser.phone_number.countryCode,
      "phone_number.number": existingUser.phone_number.number,
    });

    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(existingUser.name);
    expect(foundUser.isPremium).toBe(existingUser.isPremium);
    logger.test("Read-User operation successful");
  }, 70000);

  it("should update a user's name", async () => {
    const existingUser = {
      ...userData,
      phone_number: {
        countryCode: "91",
        number: "6361192712",
      },
    };

    await User.create(existingUser);

    const newName = "Prathviraj_B_N";

    const updatedUser = await User.findOneAndUpdate(
      {
        "phone_number.countryCode": existingUser.phone_number.countryCode,
        "phone_number.number": existingUser.phone_number.number,
      },
      { name: newName },
      { new: true }
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(newName);
    logger.test("Update-User operation successful");
  }, 70000);
  afterAll(async () => {
    // Clear the User collection before all tests
    await User.deleteMany({});
    logger.test("Truncate DB successful");
  }, 70000);

  afterAll(async () => {
    // Disconnect from the database after all tests are finished
    await mongoose.disconnect();
    logger.test("DB Disconnected Successfully");
  }, 70000);
});