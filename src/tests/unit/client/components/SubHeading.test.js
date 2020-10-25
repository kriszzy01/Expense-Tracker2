import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { 
    render, 
    screen, 
    userEvent
} from "../../../utils/test_utils";
import { SubHeading } from "../../../../components/SubHeading";

describe("SubHeading", () => {
    test("renders SubHeading Components", () => {
        render(<SubHeading children="Hello World" />);

        expect(screen.getByRole("heading", { name: /hello world/i }));
        expect(screen.queryByRole("separator")).toBeNull()
    });

    test("Renders horizontal rule if level is 2", () => {
        render(<SubHeading children="Hello World" level="2" />);

        expect(screen.getByRole("heading", { name: /hello world/i }));
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });
});