"use client";
import Image from "next/image";
import marsrovers from "../images/marsrover.svg";

const Dropdown = ({ label, options, setSelectedCamera, selectedCamera }) => (
  <div className="flex align-middle w-full items-center">
    <button className="relative group transition-all duration-200 focus:overflow-visible w-44 h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-3 rounded-lg border border-zinc-200 shadow-sm">
      <span>{label}</span>
      <svg
        className="rotate-90 group-focus:rotate-180"
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
      <div className="absolute shadow-lg -bottom-40 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
        {options.map((option, idx) => (
          <span
            className="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
            key={idx}
            onClick={() => setSelectedCamera(option.toLowerCase())}
          >
            <Image src={marsrovers} alt="rover" width={15} height={15} />
            <p>{option}</p>
          </span>
        ))}
      </div>
    </button>

    <span className="text-lg font-semibold uppercase ml-6">
      {selectedCamera}
    </span>
  </div>
);

export default Dropdown;
