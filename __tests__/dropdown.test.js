import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dropdown from "../app/components/dropdown.component";
import { RoversList } from "../app/utils/constants";

describe("Dropdown component", () => {
  const defaultLabelText = "dropdownlabel";
  it("Dropdown renders correctly", () => {
    render(
      <Dropdown
        label={defaultLabelText}
        options={RoversList}
        selectedValue={RoversList[0]}
        setSelectedValue={jest.fn()}
      />
    );
    expect(screen.getByText(`${defaultLabelText}:`)).toBeInTheDocument();
  });
});
