import React from "react";
import Input, { IInputOptions } from "./Input";

export default function InputFile(options: IInputOptions){
    return <Input
        type='file'
        style={{border:'none'}}
        {...options}
    />
}