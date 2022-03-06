import FormToxic from "../Components/formtoxic";
import {act, cleanup, render, screen} from "@testing-library/react"
import * as user from "@testing-library/user-event/dist/type";
import {fireEvent, waitFor} from "@testing-library/dom";
import React from "react";
import App from "../App";
import {create} from 'react-test-renderer';

afterEach(cleanup)

describe("Test Toxicity App", () => {
  describe("Integration tests", () => {
        it("Should check if component Render on screen", () => {
            const { getByText} = render(<FormToxic/>)
            expect(getByText('Submit').tagName).toBe('BUTTON')
            fireEvent.click(getByText('Submit'))
        });

        it('Should check if on click work', () => {
            const {getByLabelText, getByText } =render(
                <App>
                <FormToxic />
                </App>)
            const input = getByLabelText('Your text')
            expect(input.tagName).toBe('INPUT')
            user.type(input, "this is a fucking experimentation.")
            fireEvent.click(getByText("Submit"))
        });

        it('Should check if form is submit', () => {
            const component = create(<FormToxic value="fuck it"/>);
            const instance = component.root
            const form = instance.findByType("form");
            //form.props.handleSubmit();
        });
  })
  describe("End to end tests", () => {
      it('Should test end to end',  () => {
          const component = create(<FormToxic value="fuck it"/>);
          const instance = component.root
          const form = instance.findByType("form");
          //form.props.handleSubmit();
          //const result = instance.findAllByTestId("ResultToxic")
          //expect(result.state.value).toBe([0.9899, 0.0034,0.981, 0.1883,0.005, 0.2221 ])
      });
  })

})
