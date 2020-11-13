import React, { forwardRef } from "react";
import { TransactionToggle } from "./TransactionToggle";

interface FormInputProps {
    type?: string;
    id: string;
    value: string;
    label: string;
    placeholder: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

export const FormInput = forwardRef<Ref, FormInputProps>(({ type = "text", id, value, onInputChange, label, placeholder }, ref) => {

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