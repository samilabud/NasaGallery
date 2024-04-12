import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MAX_PAGES_NUMBER } from "../app/components/pagination.component";
import Pagination from "../app/components/pagination.component";

describe("Pagination component", () => {
  it("should render correctly", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={jest.fn()}
        itIsTheLastPage={false}
      />
    );
    const previousButton = screen.getByLabelText("Previous");
    const nextButton = screen.getByLabelText("Next");
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    //should render the max pages to be displayed
    for (let page = 1; page <= MAX_PAGES_NUMBER; page++) {
      expect(
        screen.queryByRole("button", { name: `goToPage-${page}` })
      ).toBeInTheDocument();
    }
  });
  it("Previous button should be disabled if user is in the first page", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={jest.fn()}
        itIsTheLastPage={false}
      />
    );
    const previousButton = screen.getByLabelText("Previous");
    expect(previousButton).toBeDisabled();
    const nextButton = screen.getByLabelText("Next");
    expect(nextButton).not.toBeDisabled;
  });
  it("Next button should not be in the document if user is in the last page", () => {
    render(
      <Pagination
        currentPage={MAX_PAGES_NUMBER}
        setCurrentPage={jest.fn()}
        itIsTheLastPage={true}
      />
    );
    const previousButton = screen.getByLabelText("Previous");
    expect(previousButton).toBeEnabled();
    const nextButton = screen.getByRole("button", {
      name: "Next",
      hidden: true,
    });
    expect(nextButton).toBeDisabled();
  });
  it("Clicking on number button should change the page to that one", () => {
    const setCurrentPageFn = jest.fn();
    const pageFour = 4;
    render(
      <Pagination
        currentPage={MAX_PAGES_NUMBER}
        setCurrentPage={setCurrentPageFn}
        itIsTheLastPage={false}
      />
    );
    const btnGoPage1 = screen.getByRole("button", {
      name: `goToPage-${pageFour}`,
    });
    expect(btnGoPage1).toBeInTheDocument();
    fireEvent.click(btnGoPage1);
    expect(setCurrentPageFn).toHaveBeenCalledWith(pageFour);
  });
});
