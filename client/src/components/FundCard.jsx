import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  desc,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer max-h-[680px] truncate"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="img"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4  text-white font-epilogue">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt=""
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191">
            Category
          </p>
        </div>
        <div className="block">
          <h3 className="font-bold">{title}</h3>
          <p className="font-normal leading-[34px] text-sm truncate">{desc}</p>
        </div>

        <div className="flex flex-wrap justify-between gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading[18px] sm:max-w-[120px] truncate">
              raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading[18px] sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 " />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
