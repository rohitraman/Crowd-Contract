import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { createCampaign as cc, money } from "../assets";
import { CustomButton, FormFeild } from "../components";
import { checkIfImage } from "../utils";

import { useStateContext } from "../context";

// {
//   "name": "prathviraj",
//   "title": "Fund for my broken leg",
//   "desc": "I was cleaning the laptop because it was bug infested , I feel , please help!!!!",
//   "target": "1",
//   "deadline": "2022-12-31",
//   "image": "https://img.freepik.com/free-photo/front-view-young-male-sitting-with-bandaged-broken-foot-screaming-from-pain-grey-wall-pain-leg-accident-twist-male-foot_140725-115883.jpg"
// }

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLaoding, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    desc: "",
    target: "",
    deadline: "",
    image: "",
  });

  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/")
  }
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      }else{
        alert('provide valid url for image')
        setForm({...form, image: ''})
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLaoding && "Loading..."}
      <div className="bg-[#3a3a43] flex justify-center items-center p-[16px] rounded-[10px] sm:min-w-[380px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create a campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormFeild
            lableName="Your name *"
            placeholder="Jon Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormFeild
            lableName="Campaign Title *"
            placeholder="Really Nice Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormFeild
          lableName="Story *"
          placeholder="Really Nice Story"
          isTextArea
          value={form.desc}
          handleChange={(e) => handleFormFieldChange("desc", e)}
        />
        <div className="flex w-full justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue text-white ml-[20px] font-bold text-[25px]">
            You will get 100% money raised
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormFeild
            lableName="Goal *"
            placeholder="ETH 0.1"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormFeild
            lableName="End Date *"
            placeholder="End date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
          <FormFeild
            lableName="Image"
            placeholder="Place image url"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="submit new Campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
