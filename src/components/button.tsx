import React from "react";
import type { Dispatch } from "react";

type Props = {
    children?: React.ReactNode;
    btnClass: string;
    setInput: Dispatch<React.SetStateAction<string>>;
};

type ButtonClickHandler = (
    setInput: Dispatch<React.SetStateAction<string>>,
    children: React.ReactNode
) => void;

function Button({ children, btnClass, setInput }: Props) {
    const handelClick: ButtonClickHandler = (setInput, children) => {
        setInput((prev) => (prev === "0" ? String(children) : prev + String(children)));
    };

    return (
        <button
            className={btnClass}
            onClick={() => handelClick(setInput, children)}
        >
            {children}
        </button>
    );
}

export default Button;
