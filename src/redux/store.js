import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/TransactionSlice";

const reducers = {
    transaction: transactionReducer,
};

export const store = configureStore({
    reducer: reducers,
});