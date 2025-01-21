import React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  onDropdownClick,
  address,
}: {
  btnType: any;
  title: string;
  handleClick?: () => void;
  styles: string;
  onDropdownClick: () => void;
  address?: string;
}) => {
  return (
    <div
      className={`flex flex-row items-center relative text-white min-h-[52px] ${!address && "pr-7"} rounded-[10px] ${styles}`}
    >
      <button
        type={btnType}
        className={`font-epilogue whitespace-nowrap font-semibold capitalize text-[16px] px-4 h-full w-[90%] leading-[26px] `}
        onClick={handleClick}
      >
        {title.toLowerCase()}
      </button>
      {!address && (
        <IoChevronDownCircleOutline
          onClick={onDropdownClick}
          className="p-2 z-10 cursor-pointer absolute top-[5px] right-0"
          size={40}
        />
      )}
    </div>
  );
};

export default CustomButton;
