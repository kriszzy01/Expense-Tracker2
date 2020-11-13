import React from "react";

interface SubHeadingProps {
    children: React.ReactNode;
    level?: string
}

export const SubHeading: React.FC<SubHeadingProps> = ({children, level=1}) => {
    let Tag: string | any = `h${level}`; //I don't know how to type this

    return(
        <>
            <Tag>{children}</Tag>
            {level === "2" && <hr></hr>}
        </>
    );
};