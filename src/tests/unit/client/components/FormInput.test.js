import React from "react";
import { FormInput } from "../../../../components/FormInput";
import {
    render,
    screen,
    userEvent, 
    initialState
} from "../../../utils/test_utils";

import "@testing-library/jest-dom/extend-expect";

const mockHandler = jest.fn();

const formInputProps = {
    id: "title",
    onInputChange: mockHandler,
    label: "Transaction Name",
    placeholder: "Enter Transaction Name..."
};

describe("Form Input", () => {
    test("it should render form label and input", () => {
        render(<FormInput {...formInputProps} />);

        expect(screen.getByText("Transaction Name"));
        expect(screen.queryByRole("button", { name: /inc/i })).toBeNull();
        expect(screen.getByPlaceholderText(/enter transaction name/i));
    });

    test("it renders transaction toggle button when id=amount", () => {
        render(<FormInput {...formInputProps} id="amount" />, initialState);

        expect(screen.getByText("Transaction Name")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /inc/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter transaction name/i)).toBeInTheDocument();
    });

    test("it calls onChange handler on on typing", () => {
        render(<FormInput {...formInputProps} />);

        userEvent.type(screen.getByPlaceholderText(/enter transaction name/i), "Rice");

        expect(mockHandler).toHaveBeenCalledTimes(4);
    });
});