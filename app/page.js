"use client";
import { useState, useEffect } from "react";
import Dropdown from "./components/dropdown.component";
import { RoversList } from "./utils/constants";
import ImageGrid from "./components/image-grid.component";
import { getCurrentDate } from "./utils/helpers";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  useEffect(() => {
    async function getMarsPhotos() {
      const current_date = getCurrentDate();
      const url = `${process.env.NEXT_PUBLIC_NASA_URL}?earth_date=${current_date}&page=1&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
      console.log(url);
      const res = await fetch(
        url,
        // "https://mocki.io/v1/b2b35bac-cba5-47dc-bcee-472f0facab67",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { photos } = await res.json();
      setPhotos(photos);
    }
    getMarsPhotos();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16 text-gray-700">
      <div className="relative flex place-items-center flex-wrap">
        <div className="block w-full text-center">
          <h1 className="text-2xl font-semibold" target="_blank">
            NASA - Mars Rover Photos
          </h1>
        </div>
        <div id="filters" className="block w-full">
          <div className="block w-1/4 z-40 ml-5">
            <Dropdown
              label="Rovers"
              options={RoversList}
              selectedCamera={selectedCamera}
              setSelectedCamera={setSelectedCamera}
            />
            <Dropdown
              label="Rover Cameras"
              options={RoversList}
              selectedCamera={selectedCamera}
              setSelectedCamera={setSelectedCamera}
            />
          </div>
        </div>
        <div className="block w-full">
          <ImageGrid photos={photos} />
        </div>
      </div>
    </main>
  );
}
