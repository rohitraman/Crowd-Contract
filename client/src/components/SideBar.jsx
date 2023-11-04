import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import AES from 'crypto-js/aes';
import cryptoJs from "crypto-js";


const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`rounded-[10px] w-[48px] h-[48px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img
          src={imgUrl}
          alt="logo"
          className={`w-1/2 h-1/2 ${styles}`}
        />
      ) : (
        <img
          src={imgUrl}
          alt="logo"
          className={`w-1/2 h-1/2 ${
            isActive !== name && "grayscale"
          } ${styles}`}
        />
      )}
    </div>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [user, setUser] = useState({});
  const [isPremium, setIsPremium] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
       setUser(JSON.parse(AES.decrypt(storedUser, import.meta.env.VITE_AES_SECRET_KEY).toString(cryptoJs.enc.Utf8)))
       setIsPremium(user.isPremium)
    }
  }, [])
  useEffect(() => {
    setIsPremium(user.isPremium) 
  }, [user])
  return (
    <div className="flex justify-between items-center flex-col stickey top-5 h-[93vh]">
      <Link to="/home">
        <Icon styles="bg-[#2c2f32] w-[48px] h-[48px]" imgUrl={logo} />
      </Link>

      <div className="flex flex-1 flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3 ">
          {navlinks.map((link) => (
            ((isPremium && link.name !== "payment") || !isPremium) && <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!isPremium && link.name === "campaign") {
                  
                    setIsActive("payment");
                    navigate("/payment")
                    return;
                  
                }
                if (link.name === "logout") {
                    localStorage.removeItem("user");
                    localStorage.removeItem("jwt");
                }
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
