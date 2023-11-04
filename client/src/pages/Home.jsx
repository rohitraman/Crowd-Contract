import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/")
  }
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true)
    if (contract) fetchCampaigns();
  }, [address, contract]);
  
  console.log();

  return (
    <div>
      
      <DisplayCampaigns
        title="All Campaigns"
        isloading={isLoading}
        campaigns={campaigns.filter((campaign)=> { return parseInt(campaign.deadline) > parseInt(Date.now())})}
      />
    </div>
  );
};

export default Home;
