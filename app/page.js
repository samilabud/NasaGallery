import Image from "next/image";
import Dropdown from "./components/dropdown.component";
import { RoversList } from "./utils/consts";
import ImageGrid from "./components/image-grid.component";

async function getMarsPhotos() {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${process.env.NASA_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}

export default async function Home() {
  const { photos } = await getMarsPhotos();
  const setSelectedCamera = async (value) => {
    "use server";
    console.log(value);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16 text-gray-700">
      <div className="relative flex place-items-center flex-wrap">
        <div className="block w-full text-center">
          <h1 className="text-2xl font-semibold" target="_blank">
            NASA - Mars Rover Photos
          </h1>
        </div>
        <div className="block w-60 z-40 ml-5">
          <Dropdown
            label="Rover Cameras"
            options={RoversList}
            setSelectedCamera={setSelectedCamera}
          />
        </div>
        <div className="block">
          <ImageGrid photos={photos} />
        </div>
      </div>
    </main>
  );
}
