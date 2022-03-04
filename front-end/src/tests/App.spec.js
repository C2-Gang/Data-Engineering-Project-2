import FormToxic from "../Components/formtoxic";
import {act, render, screen} from "@testing-library/react"
import * as user from "@testing-library/user-event/dist/type";
import {fireEvent, waitFor} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import React from "react";

afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("Test Toxicity App", () => {
  describe("Test Front-end renders", () => {
    describe("Test Inputs", () => {
        it("Should check if component Render on screen", () => {
            const { getByText} = render(<FormToxic/>)
            expect(getByText('Submit').tagName).toBe('BUTTON')
            fireEvent.click(getByText('Submit'))
        });

        xit("Should submit smth in component Render", async() => {
            await act(async () => {
                const onSubmit = jest.fn()
                const {getByLabelText, getByText } = render(<FormToxic onSubmit={onSubmit}/>);
                const input = getByLabelText("Your text")
                user.type(input, "this is an experimentation.")

                const button = getByText('Submit')
                fireEvent.click(button)
                //userEvent.click(button);
                await waitFor(async () => {
                    expect(onSubmit).toHaveBeenCalledTimes(1)
                });


            })
        })


        it('eventHandler called on click', () => {
            const onSubmit = jest.fn()
            const {getByLabelText, getByText } = render(<FormToxic onSubmit={onSubmit}/>);
            const input = getByLabelText("Your text")
            user.type(input, "this is an experimentation.")

            const button = getByText('Submit')
            fireEvent.click(button)
            expect(onSubmit).toHaveBeenCalledTimes(1)
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
