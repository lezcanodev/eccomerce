import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputNumber(options: IInputOptions){
    return <Input
        type='number'
        {...options}
    />
}