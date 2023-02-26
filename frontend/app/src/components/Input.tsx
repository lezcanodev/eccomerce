import React from "react";

export interface IInputOptions{
    name: string,
    [prop: string] : any
}

export default function Input({type, className, ...props}: {type: string} &  IInputOptions){

    return <input 
        type={type}
        className={`input ${className ?? ''}`}

        {...props}
    />
}