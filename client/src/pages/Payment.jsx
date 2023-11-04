import React from "react";
import { FormFeild, CustomButton } from "../components";
import AES from "crypto-js/aes";
import cryptoJs from "crypto-js";
import { useNavigate } from "react-router-dom";
function Payment() {
  const navigate = useNavigate();

  const data_decrypted = AES.decrypt(localStorage['user'], import.meta.env.VITE_AES_SECRET_KEY);
  const isPremium = JSON.parse(data_decrypted.toString(cryptoJs.enc.Utf8))['isPremium'];
           

  return (
    <div className="text-white">
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="bg-[#3a3a43] flex justify-center items-center p-[16px] rounded-[10px] sm:min-w-[380px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            BECOME A PREMIUM USER
          </h1>
        </div>
        to create your own campaign!
        <div className="flex items-center w-full justify-center">
          <div className="flex flex-col gap-11 my-10 w-1/2">
            <FormFeild
              lableName="UPI ID"
              placeholder="kieamon@okhdfc"
              inputType="text"
            />
            <CustomButton
              btnType="button"
              title="Pay and Subscribe"
              styles="bg-[#1dc071]"
              handleClick={(e) => {
                // make user premium
                const data_decrypted = AES.decrypt(
                  localStorage["user"],
                  import.meta.env.VITE_AES_SECRET_KEY
                );
                const user = JSON.parse(
                  data_decrypted.toString(cryptoJs.enc.Utf8)
                );
                  
                const username = user["name"];

                fetch(import.meta.env.VITE_API_URL + "/api/users/getPremium", {
                  method: "POST",
                  body: JSON.stringify({
                    userName: username,
                  }),
                  headers: {
                    'Authorization': 'Bearer '+localStorage['jwt'] ,
                    'Content-Type': 'application/json',
                  },
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    if (responseJson["msg"] === "success") {
                      // console.log(cryptoJs.AES.decrypt(responseJson["user"], import.meta.env.VITE_AES_SECRET_KEY).toString(cryptoJs.enc.Utf8));
                      localStorage.setItem("user", responseJson["user"]);
                      navigate("/create-campaign");
                    }
                  });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
