import React from "react";
import { useInput } from "../hooks/useInput";

export interface IInputOptions{
    name: string,
    [prop: string] : any
}

export default function Input({type, className, ...props}: {type: string} &  IInputOptions){
    const {value, handleInput} = useInput('');

    return <input 
        type={type}
        className={`input ${className ?? ''}`}
        value={value}
        onInput={(e) => handleInput(e)}
        {...props}
    />
}