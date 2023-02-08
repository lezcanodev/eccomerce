import React from "react";
import InputText from "../components/InputText";

import './form.css';

interface IFormBlockOptions{
    children: React.ReactNode
    label ?: string,
    error ?: string | string[]
    validate ?: (e: any) => void
}

export default function FormBlock({
    children, label, error
}: IFormBlockOptions){
    return (
        <div className='form-block'>
            <label className="form-block__label">{label}</label>
            { children }
            <div className="form-block__comment form-block__comment--error">
                {error}
            </div>
        </div>
    );
}