import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTransactions, removeTransaction } from "../redux/slices/TransactionSlice";
import { currency } from "../utils/currency";

export const TransactionHistory = () => {
    const allTransactions = useSelector(selectAllTransactions);

    const dispatch = useDispatch();

    const handleRemoveTransaction = id => dispatch(removeTransaction(id))

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