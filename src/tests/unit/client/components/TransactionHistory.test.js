import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { 
    screen,
    render,
    preloadedState,
    initialState,
    userEvent
} from "../../../utils/test_utils";

import { TransactionHistory } from "../../../../components/TransactionHistory";

describe("Transaction History", () => {
    test("it renders components with initial State from Redux store", () => {
        render(<TransactionHistory />, initialState);

        expect(screen.getByText(/no Transaction to display/i)).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryByRole("listitem")).toBeNull();
    });

    test("it renders components with updated State from Redux store", () => {
        render(<TransactionHistory />, preloadedState);

        expect(screen.getByText(/click on transaction to delete/i)).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryByRole("listitem")).toBeInTheDocument();
    });
});