import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputText(options: IInputOptions){
    return <Input
        type='text'
        {...options}
    />
}