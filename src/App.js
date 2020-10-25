import React from "react";
import { TransactionForm } from "./components/TransactionForm";
import { SubHeading } from "./components/SubHeading";
import { TransactionBalance } from "./components/TransactionBalance"
import { TransactionHistory } from "./components/TransactionHistory";

export const App = () => {
    return (
        <>
            <header className="center wrapper">
                <SubHeading>Expense Tracker</SubHeading>
            </header>

            <main className="wrapper switcher">
                <section className="gap-top-500">
                    <SubHeading level="2">
                        Add New Transaction
                    </SubHeading>
                    <TransactionForm />
                </section>

                <section className="gap-top-500">
                    <SubHeading level="2">Transaction Balance</SubHeading>
                    <TransactionBalance />
                </section>

                <section className="gap-top-500">
                    <SubHeading level="2">Transaction History</SubHeading>
                    <TransactionHistory />
                </section>
            </main>

            <footer className="wrapper"></footer>
        </>
    );
};