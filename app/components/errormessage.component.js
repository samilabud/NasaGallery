import Image from "next/image";
import alert from "../images/alert.svg";

const ErrorMessage = ({ error }) => (
  <div className="flex w-full my-6">
    <div className="break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white w-full">
      <div className="flex flex-col py-8 justify-center items-center">
        <div className="flex mb-5 justify-center items-center">
          <Image
            alt="Error warning"
            height={50}
            src={alert}
            className="inline mr-5"
          />
          <span className="text-red-500">
            {`There was a glitch in the matrix... ${error} Please try again later.`}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
