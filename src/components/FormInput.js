import React, { forwardRef } from "react";
import { TransactionToggle } from "./TransactionToggle";

export const FormInput = forwardRef(({ type = "text", id, value, onInputChange, label, placeholder }, ref) => {

    return (
        <div>
            <label htmlFor={id} className="splitter">
                <span>{label}</span>
                {id === "amount" && <TransactionToggle />}
            </label>

            <input
                type={type}
                id={id}
                value={value}
                onChange={onInputChange}
                ref={ref}
                placeholder={placeholder}
                required
            />
        </div>
    );
}); 