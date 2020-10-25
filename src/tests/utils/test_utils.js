import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../redux/slices/TransactionSlice";
import { render as renderWithRedux } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store as appStore} from "../../redux/store";

const payload = {
    id: `Rice${new Date().toDateString()}`,
    amount: 230,
    title: "Rice"
};

const preloadedState = {
    transaction: {
        ids: [payload.id],
        entities: {
            [payload.id]: payload
        },
        isIncome: true
    }
};

const initialState = {
    transaction: {
        ids: [],
        entities: {},
        isIncome: true
    }
};

const render = (ui, preloadedState, options) => {
    const testStore = configureStore({ reducer, preloadedState });

    const reduxProvider = ({ children }) => {
        return (
            <Provider store={preloadedState ? testStore: appStore}>{children}</Provider>
        );
    };

    return renderWithRedux(ui, { wrapper: reduxProvider, ...options });
};

export * from "@testing-library/react";
export { render, userEvent, preloadedState, initialState };