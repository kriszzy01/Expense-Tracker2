import React from "react";

export const SubHeading = ({children, level=1}) => {
    const Tag = `h${level}`

    return(
        <>
            <Tag>{children}</Tag>
            {level === "2" && <hr></hr>}
        </>
    );
};