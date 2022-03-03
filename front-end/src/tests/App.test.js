import FormToxic from "../Components/formtoxic";
import {render, screen} from "@testing-library/react"
import * as user from "@testing-library/user-event/dist/type";
import {fireEvent} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import React from "react";


afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("Test Toxicity App", () => {
  describe("Test Front-end renders", () => {
    describe("Test Inputs", () => {
        it("Should check if component Render on screen", async () => {
            const {findByRole} = render(<FormToxic/>);
            expect(await findByRole("button", {type: "submit"})).toBeEnabled()
        });

        xit("Should submit smth in component Render", async() => {
            const onClick = jest.fn()
            const {getByLabelText, getByRole } = render(<FormToxic onClick={onClick}/>);
            const input = getByLabelText("Your text")
            user.type(input, "this is an experimentation.")

            const button = getByRole('button')
            fireEvent.click(button)
            //userEvent.click(button);
            expect(onClick).toHaveBeenCalledTimes(1)
        })


        it('eventHandler called on click', () => {
            const handleSubmit = jest.fn();
            render(<FormToxic onSubmit={handleSubmit}/>);

            userEvent.click(screen.getByText(/Submit/i));

            expect(handleSubmit).toHaveBeenCalledTimes(1);
        });
    })

    describe("Test Output", () => {
      it("Should return smthg ", () => {

      })

      it("Should display smthg", () => {

      })

      it("Should test Submit Button", () => {

      })
    })
  })

  describe("Test Integration", () => {
    xit("", () => {

    })
  })
})
