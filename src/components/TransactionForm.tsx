import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/slices/TransactionSlice";
import { RootState, AppDispatch } from "../redux/store";

export const TransactionForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [notNumber, setNotNumber] = useState(false);

    const isIncome = useSelector((state: RootState) => state.transaction.isIncome);

    const dispatch = useDispatch<AppDispatch>();

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numberRegex = /^[0-9]*$/gm;

        if (numberRegex.test(event.target.value)) {
            setNotNumber(false);
            setAmount(event.target.value);
        } else {
            setNotNumber(true);
        }
    };

    const inputRef = React.createRef<HTMLInputElement>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const transactionAmount = isIncome ? Number(`${amount}`) : Number(`-${amount}`);

        if (amount !== "" && title !== "") {
            dispatch(addTransaction(title, transactionAmount));
        }

        setAmount("");
        setTitle("");

        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }

        setNotNumber(false);
    };



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
                    "Toggle Transaction Type by clicking Income-Expense Button" :
                    "Amount must be a Number"
                }
            </p>
        </form>
    );
};