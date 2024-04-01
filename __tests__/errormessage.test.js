import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ErrorMessage from "../app/components/errormessage.component";

describe("Error message component", () => {
  it("Should show right message", () => {
    const errorMessage = "Test reference error!";
    render(<ErrorMessage error={errorMessage} />);
    const displayedError = screen.getByText(
      `There was a glitch in the matrix... ${errorMessage} Please try again later.`,
      { exact: true }
    );
    expect(displayedError).toBeInTheDocument();
  });
});
