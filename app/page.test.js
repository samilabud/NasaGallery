import "@testing-library/jest-dom";
import { render, screen, within, act } from "@testing-library/react";
import Page from "./page";
import "jest-canvas-mock";
import "jest-fetch-mock";
import { mockData } from "./utils/mockResponse";

const mockResponse = mockData;

describe("Page", () => {
  const hasDropdownSelectedValue = (containerId, expectedText) => {
    const filterContainer = screen.getByTestId(containerId);
    const selectedValueContainer = within(filterContainer).getByLabelText(
      "dropdown-selected-value"
    );
    const expectedTextRegex = new RegExp(expectedText, "i");
    expect(within(selectedValueContainer).getByText(expectedTextRegex));
  };

  it("renders correct heading and filters", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    //Heading text
    expect(screen.getByText("NASA - Mars Rover Photos"));
    //Rover filter
    const roverFilterContainer = screen.getByTestId("rover-filter");
    expect(within(roverFilterContainer).getByText("Rover"));
    //Rover camera filter
    expect(screen.getByText("Rover Camera"));
    //Earth date or Sol filter option
    expect(screen.getByText("Filter option"));
  });

  it("default filter values should be displayed", () => {
    render(<Page />);
    //Rover filter default value
    hasDropdownSelectedValue("rover-filter", "CURIOSITY");

    //Rover Camera filter default value
    hasDropdownSelectedValue("rover-camera-filter", "ALL CAMERAS");

    //Filter option default value
    hasDropdownSelectedValue("filter-option", "EARTH DAY");
  });

  it("should fetch data from NASA API", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    await act(async () => {
      render(<Page />);
    });
    const fetchedPhotosCount = mockResponse.photos.length;

    const galleryContainer = screen.getByTestId("gallery-container");
    //Should has 6 Photos from Curiosity Rover
    expect(within(galleryContainer).getAllByText("Curiosity").length).toEqual(
      fetchedPhotosCount
    );
    expect(within(galleryContainer).getAllByText("Camera:").length).toEqual(
      fetchedPhotosCount
    );
    expect(
      within(galleryContainer).getAllByText("(martian day)").length
    ).toEqual(fetchedPhotosCount);
    expect(within(galleryContainer).getAllByText("Earth Date:").length).toEqual(
      fetchedPhotosCount
    );
    //Should has all landing labels like => Earth Date: 2015-05-30
    expect(within(galleryContainer).getAllByText("2015-05-30").length).toEqual(
      fetchedPhotosCount
    );

    global.fetch.mockRestore();
  });

  it("should show warning when no photos found", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        photos: [],
      }),
    });
    await act(async () => {
      render(<Page />);
    });

    const galleryContainer = screen.getByTestId("notfound-gallery-container");

    expect(
      within(galleryContainer).getByText(
        "No photos were found for the current filters or page selected. Please change the filter options to find results or go back in pagination."
      )
    ).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
