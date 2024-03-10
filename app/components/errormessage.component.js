import Image from "next/image";
import alert from "../images/alert.svg";

const ErrorMessage = ({ error }) => (
  <div className="flex flex-wrap -mx-3 mb-5">
    <div className="w-full max-w-full px-3 mb-6  mx-auto">
      <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] border border-stone-200 bg-white m-5">
        <div className="flex py-8 px-5 justify-center">
          <div className="block mx-6 mb-5">
            <Image
              alt="Error warning"
              height={50}
              src={alert}
              className="inline mr-5"
            />
            <span className="text-red-500">
              There was a glitch in the matrix... {error} &nbsp;Please try again
              later.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
