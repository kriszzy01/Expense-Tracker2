import React from "react";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "../redux/slices/TransactionSlice";
import { SubHeading } from "./SubHeading";
import { currency } from "../utils/currency";

export const TransactionBalance = () => {
    const allTransactions = useSelector(selectAllTransactions);

    const balance = allTransactions.reduce((prev, next) => prev + next.amount, 0);

    const income = allTransactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((prev, next) => prev + next.amount, 0);

    const expense = allTransactions
        .filter((transaction) => transaction.amount < 1)
        .reduce((prev, next) => prev + next.amount, 0);


    return (
        <>
            <SubHeading level="3">Your Balance: {currency(balance.toFixed(2))}</SubHeading>
            <dl className="splitter | bg-neutral gap-top-300">
                <div>
                    <dt>Income</dt>
                    <dd>{currency(income.toFixed(2))}</dd>
                </div>
                <div>
                    <dt>Expenses</dt>
                    <dd>{currency(expense.toFixed(2))}</dd>
                </div>
            </dl>
        </>
    );
};