"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Dropdown from "./components/dropdown.component";
import { RoversList, FilterOptions, RoverCameras } from "./utils/constants";
import ImageGrid from "./components/image-grid.component";
import { getDateFormated } from "./utils/helpers";
import space from "./images/space.svg";
import rightArrow from "./images/right-arrow.svg";

const defaultCurrentDate = getDateFormated(new Date());
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState(null);
  const [selectedRover, setSelectedRover] = useState("curiosity");
  const [selectedCamera, setSelectedCamera] = useState("All Cameras");
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    FilterOptions[0]
  );
  const [currentDate, setCurrentDate] = useState(defaultCurrentDate);
  const debouncedCurrentDate = useDebounce(currentDate, 200);
  const [sol, setSol] = useState("2890");
  const debouncedSol = useDebounce(sol, 500);

  const isEarthDayFilterSelected =
    selectedFilterOption.toLocaleLowerCase() === FilterOptions[0].toLowerCase();

  useEffect(() => {
    async function getMarsPhotos() {
      let filterOption;
      if (debouncedCurrentDate) {
        filterOption = isEarthDayFilterSelected
          ? `earth_date=${debouncedCurrentDate}`
          : `sol=${debouncedSol}`;
      } else {
        filterOption = `earth_date=${defaultCurrentDate}`;
      }
      const cameraFilter =
        selectedCamera !== "All Cameras"
          ? `&camera=${selectedCamera.toLowerCase()}`
          : "";

      const url = `${process.env.NEXT_PUBLIC_NASA_URL}${selectedRover}/photos?${filterOption}${cameraFilter}&page=1&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;

      setIsLoading(true);
      // console.log(url);
      const res = await fetch(
        url,
        // "https://mocki.io/v1/b2b35bac-cba5-47dc-bcee-472f0facab67",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      try {
        const { photos } = await res.json();
        setPhotos(photos);
      } catch (error) {
        console.log({ error });
      }
      setIsLoading(false);
    }
    getMarsPhotos();
  }, [
    debouncedSol,
    debouncedCurrentDate,
    isEarthDayFilterSelected,
    selectedRover,
    selectedCamera,
  ]);

  const filterAvailableCameras = useCallback(() => {
    const filteredRoverCameras = RoverCameras.filter(
      (val) => val[selectedRover.toLocaleLowerCase()]
    );
    return filteredRoverCameras;
  }, [selectedRover]);

  const getListOfCamerasTransformed = useCallback(() => {
    const availableCameras = filterAvailableCameras();
    const transformedList = availableCameras.map((val) => val.abbreviation);
    return transformedList;
  }, [filterAvailableCameras]);

  const handleSearchByDateChange = (datePicked) => {
    const datePickedFormated = getDateFormated(datePicked);
    if (datePickedFormated.length >= 8) {
      setCurrentDate(datePickedFormated);
    }
  };
  const handleSearchBySolChange = (event) => {
    setSol(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-16 text-gray-700">
      <div className="relative flex place-items-center flex-wrap">
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
        <div id="filters" className="flex mt-10 w-full">
          <div className="inline w-1/4 z-40 ml-5">
            <Dropdown
              label="Rovers"
              options={RoversList}
              selectedValue={selectedRover}
              setSelectedValue={setSelectedRover}
            />
          </div>
          <div className="inline w-1/4 z-40 ml-1">
            <Dropdown
              label="Rover Cameras"
              options={getListOfCamerasTransformed()}
              selectedValue={selectedCamera}
              setSelectedValue={setSelectedCamera}
            />
          </div>
          <div className="flex w-2/4 ml-1 justify-start">
            <div className="inline z-40">
              <Dropdown
                label="Filter option"
                options={FilterOptions}
                selectedValue={selectedFilterOption}
                setSelectedValue={setSelectedFilterOption}
              />
            </div>
            <Image src={rightArrow} alt="right arrow" height="30" width="30" />
            {isEarthDayFilterSelected ? (
              <div className="ml-4">
                <DatePicker
                  onChange={handleSearchByDateChange}
                  value={currentDate}
                  className="w-full px-2 py-2 text-gray-800"
                  format="yyyy-MM-dd"
                  required
                  yearPlaceholder="yyyy"
                  monthPlaceholder="MM"
                  dayPlaceholder="dd"
                  clearIcon={null}
                />
                {/* <input
                  type="search"
                  
                  placeholder={"2020-09-22"}
                  value={currentDate}
                  onChange={handleSearchByDateChange}
                /> */}
              </div>
            ) : (
              <div className="ml-4">
                <input
                  type="number"
                  className="w-full px-4 py-2 text-gray-800 rounded-full focus:outline-none"
                  placeholder={"2890"}
                  value={sol}
                  onChange={handleSearchBySolChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="block w-full">
          <ImageGrid photos={photos} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
