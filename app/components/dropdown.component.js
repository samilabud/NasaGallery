"use client";
import Image from "next/image";
import marsrovers from "../images/marsrover.svg";
import { useState, useEffect, useRef } from "react";

const Dropdown = ({
  label,
  options,
  setSelectedValue,
  selectedValue,
  tabindex = 1,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const handleSelected = (option) => {
    setOpenOptions(false);
    setSelectedValue(option.toLowerCase());
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setOpenOptions(false);
    }
  };

  return (
    <div className="flex align-middle w-full items-center">
      <button
        className={`relative group transition-all duration-200 ${
          openOptions ? "overflow-visible" : "overflow-hidden"
        } w-44 h-max p-2 flex flex-row items-center justify-center bg-white gap-3 rounded-lg border border-zinc-200 shadow-sm`}
        tabIndex={tabindex}
        onClick={() => setOpenOptions(!openOptions)}
        ref={buttonRef}
      >
        <span className="text-nowrap">{label}</span>
        <svg
          className={`${openOptions ? "rotate-180" : "rotate-90"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
          />
        </svg>
        <div className="absolute shadow-lg top-11 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
          {options.map((option, idx) => (
            <span
              className={`flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg ${
                selectedValue.toLowerCase() === option.toLowerCase()
                  ? "bg-zinc-100"
                  : ""
              }`}
              key={idx}
              onClick={() => handleSelected(option)}
            >
              <Image src={marsrovers} alt="rover" width={15} height={15} />
              <p>{option}</p>
            </span>
          ))}
        </div>
      </button>

      <span
        aria-label="dropdown-selected-value"
        className="text-lg font-semibold uppercase ml-2 text-cyan-900 block text-nowrap pr-2"
      >
        {selectedValue}
      </span>
    </div>
  );
};

export default Dropdown;
