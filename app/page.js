"use client";
import { useState, useEffect } from "react";
import Dropdown from "./components/dropdown.component";
import { RoversList } from "./utils/consts";
import ImageGrid from "./components/image-grid.component";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  useEffect(() => {
    async function getMarsPhotos() {
      const res = await fetch(
        // `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`,
        "https://mocki.io/v1/b2b35bac-cba5-47dc-bcee-472f0facab67",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { photos } = await res.json();
      setPhotos(photos.slice(0, 24));
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
        <div className="block w-60 z-40 ml-5">
          <Dropdown
            label="Rover Cameras"
            options={RoversList}
            setSelectedCamera={setSelectedCamera}
          />
          <span>{selectedCamera}</span>
        </div>
        <div className="block w-full">
          <ImageGrid photos={photos} />
        </div>
      </div>
    </main>
  );
}
