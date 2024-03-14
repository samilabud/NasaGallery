import { useCallback, useState } from "react";
import Image from "next/image";
import DatePicker from "react-date-picker";
import Dropdown from "../components/dropdown.component";
import { getDateFormated } from "../utils/helpers";
import { RoversList, FilterOptions, RoverCameras } from "../utils/constants";
import rightArrow from "../images/right-arrow.svg";
import "react-calendar/dist/Calendar.css";
import "./customdatepicker.css";

const SearchFilters = ({
  selectedRover,
  setSelectedRover,
  selectedCamera,
  setSelectedCamera,
  selectedFilterOption,
  setSelectedFilterOption,
  setCurrentDate,
  sol,
  setSol,
  isEarthDayFilterSelected,
  setCurrentPage,
}) => {
  const [datePickerDate, setDatePickerDate] = useState(new Date());

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
      setDatePickerDate(datePicked);
      setCurrentPage(1);
    }
  };
  const handleSearchBySolChange = (event) => {
    setSol(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div id="filters" className="flex mt-10 w-full justify-between">
      <div data-testid="rover-filter" className="inline z-40 ml-5 min-w-40">
        <Dropdown
          label="Rover"
          options={RoversList}
          selectedValue={selectedRover}
          setSelectedValue={setSelectedRover}
        />
      </div>
      <div
        data-testid="rover-camera-filter"
        className="inline z-40 ml-1 min-w-52"
      >
        <Dropdown
          label="Rover Camera"
          options={getListOfCamerasTransformed()}
          selectedValue={selectedCamera}
          setSelectedValue={setSelectedCamera}
        />
      </div>
      <div
        data-testid="filter-option"
        className="flex w-2/4 ml-1 justify-start"
      >
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
          <div className="ml-3 -mb-5">
            <DatePicker
              onChange={handleSearchByDateChange}
              value={datePickerDate}
              className="w-full text-gray-800"
              format="yyyy-MM-dd"
              required
              yearPlaceholder="yyyy"
              monthPlaceholder="MM"
              dayPlaceholder="dd"
              clearIcon={null}
              maxDate={new Date()}
            />
          </div>
        ) : (
          <div className="ml-4">
            <input
              type="number"
              className="w-28 px-4 py-2 text-gray-800 rounded-md focus:outline-none border-solid border"
              placeholder={"2890"}
              value={sol}
              onChange={handleSearchBySolChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
