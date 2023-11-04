import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";
import { logo, menu, search, thirdweb } from "../assets";

import { navlinks } from "../constants";
import { useStateContext } from "../context";
import CryptoJS from "crypto-js";

const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect,address } = useStateContext();

  return (
    <div className="md:flex-row flex flex-col-reverse md:justify-between mb-[35px] gap-6 justify-center items-center">
      <div className="flex lg:flex-1 flex-row items-center md:max-w-[458px] max-w-[100%] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] justify-around gap-2 rounded-[100px]">
        <input
          type="text"
          placeholder="Search campaigns"
          className="h-full w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none rounded-[20px] p-3 flex flex-1 "
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4 items-center">
        <CustomButton
          btnType="button"
          title={address ? "create a campaign" : "connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            const data_decrypted = CryptoJS.AES.decrypt(localStorage['user'], import.meta.env.VITE_AES_SECRET_KEY);
            const isPremium = JSON.parse(data_decrypted.toString(CryptoJS.enc.Utf8))['isPremium'];
            if(!isPremium) navigate("payment");
            else if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="sm:hidden flex justify-between items-center relative w-[100%]">
        <Link to="/profile">
          <div className="w-[32px] h-[32px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
        <div>
          <div className="w-[32px] h-[32px] rounded-full flex justify-center items-center cursor-pointer">
            <img
              src={menu}
              alt="menu"
              className="w-[60%] h-[60%] object-contain"
              onClick={() => setToggleDrawer((prev) => !prev)}
            />
            <div
              className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
                !toggleDrawer ? "-translate-y-[100vh]" : "-translate-y-0"
              } transition-all duration-700`}
            >
              <ul className="mb-4">
                {navlinks.map((link) => (
                  <li
                    key={link.name}
                    className={`flex p-4 ${
                      isActive === link.name && "bg-[#3a3a43]"
                    }`}
                    onClick={() => {
                      if (!link.disabled) {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                        navigate(link.link);
                      }
                    }}
                  >
                    <img
                      src={link.imgUrl}
                      alt={link.name}
                      className={`${
                        isActive === link.name ? "grayscale-0" : "grayscale"
                      }`}
                    />
                    <p
                      className={`pl-3 font-epilogue text-[14px] font-semibold ${
                        isActive === link.name
                          ? "text-[#1dc071]"
                          : "text-[#808191]"
                      }`}
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex mx-4">
                <CustomButton
                  btnType="button"
                  title={address ? "create a campaign" : "connect"}
                  styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                  handleClick={() => {
                    if (address) navigate("create-campaign");
                    else {
                      connect();
                    }
                  }}
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
