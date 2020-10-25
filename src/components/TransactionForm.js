import React, { useState, useRef } from "react";
import { FormInput } from "./FormInput";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/TransactionSlice";
import { useSelector } from "react-redux";
import { isIncome as isInc } from "../redux/slices/TransactionSlice";

export const TransactionForm = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [notNumber, setNotNumber] = useState(false);

    const isIncome = useSelector(isInc);

    const dispatch = useDispatch();

    const onTitleChange = event => setTitle(event.target.value);

    const onAmountChange = event => {
        const numberRegex = /^[0-9]*$/gm;

        if (numberRegex.test(event.target.value)) {
            setNotNumber(false);
            setAmount(event.target.value);
        } else {
            setNotNumber(true);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        const transactionAmount = isIncome ? Number(`${amount}`) : Number(`-${amount}`);

        if (amount !== "" && title !== "") {
            dispatch(addTransaction(title, transactionAmount));
        }

        setAmount("");
        setTitle("");

        inputRef.current.focus();
        setNotNumber(false);
    };

    const inputRef = useRef(null);

    return (
        <form onSubmit={handleSubmit} className="form | flow">
            <FormInput
                id="title"
                value={title}
                onInputChange={onTitleChange}
                label="Transaction Name"
                ref={inputRef}
                placeholder="Enter Transaction Name..."
            />

            <FormInput
                id="amount"
                value={amount}
                onInputChange={onAmountChange}
                label="Amount"
                placeholder="Enter Amount..."
            />
            
            <button type="submit" className="bg-primary">Add Transaction</button>
            <p className="instructions">
                {!notNumber ?
                    "Toggle Transaction Type by clicking Income-Expense Button":
                    "Amount must be a Number"
                }
            </p>
        </form>
    );
};