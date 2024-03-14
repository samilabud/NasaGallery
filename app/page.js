"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";
import { FilterOptions } from "./utils/constants";
import ImageGrid from "./components/image-grid.component";
import { getDateFormated } from "./utils/helpers";
import space from "./images/space.svg";
import ErrorMessage from "./components/errormessage.component";
import Pagination from "./components/pagination.component";
import SearchFilters from "./components/searchfilters.component";

const defaultValue = {
  currentDate: getDateFormated(new Date()),
  currentPage: 1,
  sol: "2890",
  rover: "curiosity",
  roverCamera: "All Cameras",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState(null);
  const [selectedRover, setSelectedRover] = useState(defaultValue.rover);
  const [selectedCamera, setSelectedCamera] = useState(
    defaultValue.roverCamera
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    FilterOptions[0]
  );
  const [currentDate, setCurrentDate] = useState(defaultValue.currentDate);
  const debouncedCurrentDate = useDebounce(currentDate, 200);
  const [sol, setSol] = useState(defaultValue.sol);
  const debouncedSol = useDebounce(sol, 500);

  const [currentPage, setCurrentPage] = useState(defaultValue.currentPage);
  const debouncedPage = useDebounce(currentPage, 500);

  const isEarthDayFilterSelected =
    selectedFilterOption.toLocaleLowerCase() === FilterOptions[0].toLowerCase();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRover, selectedCamera, selectedFilterOption]);

  useEffect(() => {
    async function getMarsPhotos() {
      if (!debouncedPage) {
        return;
      }
      let filterOption;
      if (debouncedCurrentDate) {
        filterOption = isEarthDayFilterSelected
          ? `earth_date=${debouncedCurrentDate}`
          : `sol=${debouncedSol}`;
      } else {
        filterOption = `earth_date=${defaultValue.currentDate}`;
      }
      const cameraFilter =
        selectedCamera.toLowerCase() !== defaultValue.roverCamera.toLowerCase()
          ? `&camera=${selectedCamera.toLowerCase()}`
          : "";

      const url = `${process.env.NEXT_PUBLIC_NASA_URL}${selectedRover}/photos?${filterOption}${cameraFilter}&page=${debouncedPage}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const { photos } = data;
        setPhotos(photos);
      } catch (error) {
        setErrorMessage("We have problem when fetching NASA API.");
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
    debouncedPage,
  ]);

  const shouldShowPagination =
    (photos && photos.length >= 1) || currentPage !== 1;
  const itIsTheLastPage = shouldShowPagination && photos && photos.length < 25;
  const hidePagination = photos && currentPage === 1 && photos.length < 25;

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

        <SearchFilters
          selectedRover={selectedRover}
          setSelectedRover={setSelectedRover}
          selectedCamera={selectedCamera}
          setSelectedCamera={setSelectedCamera}
          selectedFilterOption={selectedFilterOption}
          setSelectedFilterOption={setSelectedFilterOption}
          setCurrentDate={setCurrentDate}
          sol={sol}
          setSol={setSol}
          setCurrentPage={setCurrentPage}
          isEarthDayFilterSelected={isEarthDayFilterSelected}
        />

        <div className="block w-full">
          {errorMessage ? (
            <ErrorMessage error={errorMessage} />
          ) : (
            <>
              <ImageGrid photos={photos} isLoading={isLoading} />
              {shouldShowPagination && !hidePagination && (
                <div className="ml-5 -mt-8">
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itIsTheLastPage={itIsTheLastPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
