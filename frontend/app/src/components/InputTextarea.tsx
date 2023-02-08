import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputTextarea({className, ...rest}: IInputOptions){
    return <textarea
        className={`input ${className}`}
        {...rest}
    ></textarea>;
}