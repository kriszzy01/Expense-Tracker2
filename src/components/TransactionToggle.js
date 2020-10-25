import React from "react";
import { isIncome as isInc} from "../redux/slices/TransactionSlice";
import { useSelector, useDispatch } from "react-redux";
import { toggleTransaction } from "../redux/slices/TransactionSlice";

export const TransactionToggle = () => {
    const isIncome = useSelector(isInc);

    const dispatch = useDispatch();

    const handleToggle = () => dispatch(toggleTransaction());

    return (
        <button 
            onClick={handleToggle} 
            type="button" 
            className={`toggle-button | radius ${isIncome ? "| bg-tertiary": "| bg-secondary"}`}>
                {isIncome ? "Income" : "Expense"}
        </button>
    );
};