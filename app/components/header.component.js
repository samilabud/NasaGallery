import Image from "next/image";
import space from "../images/space.svg";

const Header = () => (
  <div className="w-full text-center flex justify-center items-center mb-5">
    <Image
      src={space}
      height={60}
      width={60}
      alt="Space"
      className="mr-5 transition-all duration-1000 hover:scale-110"
    />
    <h1 className="text-2xl font-semibold" target="_blank">
      NASA - Mars Rover Photos
    </h1>
  </div>
);

export default Header;
