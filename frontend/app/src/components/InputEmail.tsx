import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputEmail(options: IInputOptions){
    return <Input
        type='email'
        {...options}
    />
}