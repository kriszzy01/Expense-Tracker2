import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const transactionAdapter = createEntityAdapter();

export const initialState = transactionAdapter.getInitialState({
    isIncome: true,
});

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: {
            reducer(state, payload: PayloadAction<{id: string; amount: number; title: string}>) {
                transactionAdapter.addOne(state, payload)
            },
            prepare(title: string, amount: number) {
                return {
                    payload: {
                        id: `${title}${new Date().getSeconds()}`,
                        amount,
                        title
                    }
                }
            }
        },
        removeTransaction: {
            reducer(state, payload: PayloadAction<string>) {
                transactionAdapter.removeOne(state, payload)
            },
            prepare(id) {
                return {
                    payload: id
                }
            }
        },
        toggleTransaction: (state) => {
            state.isIncome = !state.isIncome;
        }
    }
});

export default transactionSlice.reducer; //Transaction Reducer
export const {
    addTransaction,
    removeTransaction,
    toggleTransaction
} = transactionSlice.actions; //Actions

//export const isIncome = state => state.transaction.isIncome;

export const {
    selectAll: selectAllTransactions,
    selectById: selectTransactionById
} = transactionAdapter.getSelectors<RootState>(state => state.transaction);