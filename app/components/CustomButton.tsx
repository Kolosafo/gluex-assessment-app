import React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  onDropdownClick
}: {
  btnType: any;
  title: string;
  handleClick?: () => void;
  styles: string;
  onDropdownClick: () => void;
}) => {
  return (
    <div
      className={`flex flex-row items-center relative text-white min-h-[52px] pr-7 rounded-[10px] ${styles}`}
    >
      <button
        type={btnType}
        className={`font-epilogue font-semibold capitalize text-[16px] px-4 h-full leading-[26px] `}
        onClick={handleClick}
      >
        {title.toLowerCase()}
      </button>
      <IoChevronDownCircleOutline onClick={onDropdownClick} className="p-2 z-10 cursor-pointer absolute top-[5px] right-0" size={40} />
    </div>
  );
};

export default CustomButton;
