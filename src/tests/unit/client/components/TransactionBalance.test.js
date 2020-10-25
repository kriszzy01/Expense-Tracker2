import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { 
    screen,
    render,
    preloadedState,
    initialState
} from "../../../utils/test_utils";

import { TransactionBalance } from "../../../../components/TransactionBalance";

describe("Transaction History", () => {
    test("it renders components with initial State from Redux store", () => {
        render(<TransactionBalance />, initialState);

        expect(screen.getByRole("heading", { name: "Your Balance: $0.00"})).toBeInTheDocument();
        expect(screen.getAllByRole("definition")).toHaveLength(2);
        expect(screen.getByText(/income/i)).toBeInTheDocument();
        expect(screen.getByText(/expense/i)).toBeInTheDocument()
    });

    test("it renders components with updated State from Redux store", () => {
        render(<TransactionBalance />, preloadedState);

        expect(screen.getByRole("heading", { name: "Your Balance: $230.00"})).toBeInTheDocument();
    });
});