import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import Dropdown from "../app/components/dropdown.component";
import { RoversList } from "../app/utils/constants";
import userEvent from "@testing-library/user-event";

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

  it("Should show right option label when selected", async () => {
    const user = userEvent.setup();
    let selectedValue = RoversList[0];
    const setSelectedValue = jest.fn();
    act(() => {
      render(
        <Dropdown
          label={defaultLabelText}
          options={RoversList}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );
    });

    const dropdowncontainer = screen.getByTestId("dropdown-list");
    fireEvent.click(dropdowncontainer);
    const opportunityText = RoversList[1]; //Opportunity
    const dropdownListOptionsContainer = screen.getByTestId(
      "dropdown-list-options"
    );
    const optionSelected = within(dropdownListOptionsContainer).getByText(
      opportunityText
    );
    expect(optionSelected).toBeInTheDocument();
    await user.click(optionSelected);

    expect(setSelectedValue).toHaveBeenCalledWith(
      opportunityText.toLocaleLowerCase()
    );
  });
});
