import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contract_address = "0x5C54835417ad22018de4A73C13ac4470573C52f1";
  const { contract } = useContract(contract_address);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const connect = useMetamask();
  const address = useAddress();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.desc,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("Contract call Success!");
    } catch (e) {
      console.log("Contract call error!");
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      desc: campaign.desc,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image:campaign.img,
      id: i
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign)=> campaign.owner === address);
    return filteredCampaigns;
  }

  const donate = async (pid, amount) => {
    const data = await contract.call('donateToCampaign', pid, {value: ethers.utils.parseEther(amount)});
    return data;
  }

  const getDonations = async (pid) => {
    const donations = await contract.call('getDonators', pid);
    const numberOfDonations = donations[0].length

    const parsedDonations = [];

    for ( let i = 0 ; i < numberOfDonations; i++){
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]).toString()
      })
    }

    return parsedDonations;

  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        donate,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
