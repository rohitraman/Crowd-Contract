import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/")
  }
  const fetchCampaigns = async () => {
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true)
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      
      <DisplayCampaigns
        title="All Campaigns"
        isloading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
