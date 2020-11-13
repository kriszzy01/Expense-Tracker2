import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTransactions, removeTransaction } from "../redux/slices/TransactionSlice";
import { currency } from "../utils/currency";
import { AppDispatch } from "../redux/store";

export const TransactionHistory: React.FC = () => {
    const allTransactions = useSelector(selectAllTransactions) as Array<{id: string, amount: number, title: string}>;

    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveTransaction = (id: string) => dispatch(removeTransaction(id))

    const listItem = allTransactions.map(transaction => {
        const { title, amount, id } = transaction;

        return (
            <li
                key={id}
                onClick={() => handleRemoveTransaction(id)}
                className={`${String(amount).includes("-") ? "expense" : "income"} | splitter | bg-neutral`}>
                    <span>{title}</span>
                    <span>{currency(amount)}</span>
            </li>
        )
    })

    return (
        <>
            <p className="instructions | gap-top-300">
                {allTransactions.length === 0
                    ? "No Transaction to Display"
                    : "Click on Transaction to Delete"}
            </p>
            <ul className="history | gap-top-300">{listItem}</ul>
        </>
    );
};