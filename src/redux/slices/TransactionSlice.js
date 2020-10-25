import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const transactionAdapter = createEntityAdapter();

export const initialState = transactionAdapter.getInitialState({
    isIncome: true,
});

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: {
            reducer(state, payload) {
                transactionAdapter.addOne(state, payload)
            },
            prepare(title, amount) {
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
            reducer(state, payload) {
                transactionAdapter.removeOne(state, payload)
            },
            prepare(id) {
                return {
                    payload: id
                }
            } 
        },
        toggleTransaction: {
            reducer(state) {
                state.isIncome = !state.isIncome;
            }
        }
    }
});

export default transactionSlice.reducer; //Transaction Reducer
export const {
    addTransaction, 
    removeTransaction, 
    toggleTransaction
} = transactionSlice.actions; //Actions

export const isIncome = state => state.transaction.isIncome; 
export const {
    selectAll: selectAllTransactions,
    selectById: selectTransactionById
} = transactionAdapter.getSelectors(state => state.transaction);