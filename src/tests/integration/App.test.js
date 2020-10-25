import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { App } from "../../App";

import {
    render,
    screen,
    userEvent,
    initialState,
    preloadedState
} from "../utils/test_utils";

/*I have a problem with this test, data persists in the redux store, 
making this feel like an end to end test. I left it this way because 
I haven't figured out how to clear the store*/


describe("App", () => {
    test("it renders all components", () => {
        render(<App />);

        expect(screen.getAllByRole("heading")).toHaveLength(5);
        expect(screen.getAllByRole("separator")).toHaveLength(3);
        expect(screen.getByPlaceholderText(/transaction name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("definition")).toHaveLength(2);
        expect(screen.getAllByRole("button")).toHaveLength(2);
        expect(screen.getByText(/no transaction to display/i)).toBeInTheDocument();
    });
    
    test("it updates income form data", () => {
        render(<App />);

        const nameInput = screen.getByPlaceholderText(/transaction name/i);
        const amountInput = screen.getByPlaceholderText(/amount/i);
        const submitButton = screen.getByRole("button", { name: /add transaction/i});

        userEvent.type(nameInput, "Rice");
        userEvent.type(amountInput, "230"); //Income
        userEvent.click(submitButton);

        expect(screen.getByRole("heading", { name: "Your Balance: $230.00"})).toBeInTheDocument();
        expect(screen.getByText(/click on transaction to delete/i)).toBeInTheDocument();
        expect(screen.queryByRole("listitem")).toBeInTheDocument();
    });

    test("throws error if letter is entered for amount form input", () => {
        render(<App />);

        const amountInput = screen.getByPlaceholderText(/amount/i);

        userEvent.type(amountInput, "r"); //Entering a letter in amount input

        expect(screen.queryByText(/amount must be a number/i)).toBeInTheDocument();
    });

    test("it updates expense with form data", () => {
        render(<App />);

        const nameInput = screen.getByPlaceholderText(/transaction name/i);
        const amountInput = screen.getByPlaceholderText(/amount/i);
        const submitButton = screen.getByRole("button", { name: /add transaction/i});
        const toggleTransaction = screen.getByRole("button", { name: /income/i});

        userEvent.type(nameInput, "Beans");
        userEvent.click(toggleTransaction); //Toggle transaction type from income to expense
        userEvent.type(amountInput, "30"); //Expense
        userEvent.click(submitButton);

        expect(screen.getByRole("heading", { name: "Your Balance: $200.00"})).toBeInTheDocument();
        expect(screen.getByText(/click on transaction to delete/i)).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    });

    test("it removes transaction from history", () => {
        render(<App />);

        const listItems = screen.getAllByRole("listitem");
        const income = listItems[0];
        const expense = listItems[1];

        expect(screen.queryAllByRole("listitem")).toHaveLength(2);

        userEvent.click(income);

        expect(screen.queryAllByRole("listitem")).toHaveLength(1);
        expect(screen.getByRole("heading", { name: "Your Balance: -$30.00"})).toBeInTheDocument();
    });
});