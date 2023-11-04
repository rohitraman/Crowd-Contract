import React from "react";

const FormFeild = ({
  placeholder,
  lableName,
  inputType,
  value,
  handleChange,
  isTextArea,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {lableName && (
        <span className="font-epilogue font-medium tetx-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {lableName}
        </span>
      )}
      {isTextArea ? (
        <textarea required
        value={value}
        onChange={handleChange}
        rows={10}
        placeholder={placeholder}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-lg sm:min-w-[300px]"
     />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-lg sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormFeild;
