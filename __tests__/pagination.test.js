import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
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
        screen.queryByRole("button", { name: "goToPage-3" })
      ).toBeInTheDocument();
    }
  });
  it("should disable prev button if user is in first page", () => {
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
});
