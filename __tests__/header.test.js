import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Header from "../app/components/header.component";

describe("Header", () => {
  it("Should render header component correctly", () => {
    render(<Header />);
    const headerTitle = screen.getByRole("heading", { level: 1 });
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent("NASA - Mars Rover Photos");
  });
});
