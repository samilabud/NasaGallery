"use client";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { FilterOptions } from "./utils/constants";
import ImageGrid from "./components/image-grid.component";
import { getDateFormated } from "./utils/helpers";
import Header from "./components/header.component";
import ErrorMessage from "./components/errormessage.component";
import Pagination from "./components/pagination.component";
import SearchFilters from "./components/searchfilters.component";

const defaultValues = {
  currentDate: getDateFormated(new Date()),
  currentPage: 1,
  sol: "2890",
  rover: "curiosity",
  roverCamera: "All Cameras",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState(null);
  const [selectedRover, setSelectedRover] = useState(defaultValues.rover);
  const [selectedCamera, setSelectedCamera] = useState(
    defaultValues.roverCamera
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    FilterOptions[0]
  );
  const [currentDate, setCurrentDate] = useState(defaultValues.currentDate);
  const debouncedCurrentDate = useDebounce(currentDate, 200);
  const [sol, setSol] = useState(defaultValues.sol);
  const debouncedSol = useDebounce(sol, 500);

  const [currentPage, setCurrentPage] = useState(defaultValues.currentPage);
  const debouncedPage = useDebounce(currentPage, 500);

  const isEarthDayFilterSelected =
    selectedFilterOption.toLocaleLowerCase() === FilterOptions[0].toLowerCase();

  useEffect(() => {
    setCurrentPage(defaultValues.currentPage);
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
        filterOption = `earth_date=${defaultValues.currentDate}`;
      }
      const cameraFilter =
        selectedCamera.toLowerCase() !== defaultValues.roverCamera.toLowerCase()
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
    <main className="flex py-3 lg:py-16 text-gray-700 p-4 lg:p-20">
      <div className="flex flex-col items-center justify-between w-full min-h-96">
        <Header />

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
