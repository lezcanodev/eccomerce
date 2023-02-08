import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputPassword(options: IInputOptions){
    return <Input
        type='password'
        {...options}
    />
}