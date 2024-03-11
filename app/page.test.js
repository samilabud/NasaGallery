import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import "jest-canvas-mock";
import "jest-fetch-mock";

// jest.mock("canvas", () => {
//   return {
//     getContext: jest.fn(),
//   };
// });

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
