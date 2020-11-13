import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTransaction } from "../redux/slices/TransactionSlice";
import { RootState, AppDispatch } from "../redux/store";

export const TransactionToggle: React.FC = () => {
    const isIncome = useSelector((state: RootState) => state.transaction.isIncome);

    const dispatch = useDispatch<AppDispatch>();

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