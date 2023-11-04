import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isloading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title}({campaigns.length})
      </h1>

      <div className="flex flex-wrapm mt-[20px] gap-[20px]">
        {isloading && (
          <img
            src={loader}
            alt="loading..."
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isloading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading[30px] text-[#818183]">
            No Campaigns
          </p>
        )}
        {!isloading &&
          campaigns.length > 0 &&
          campaigns.map((camp) => (
            <FundCard
              key={camp.id}
              {...camp}
              handleClick={() => handleNavigate(camp)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
