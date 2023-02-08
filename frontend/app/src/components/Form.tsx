import React, { useState } from "react";
import InputText from "../components/InputText";

import './form.css';

interface IFormOptions{
    children: React.ReactNode
    title ?: string,
    submitValue: string,
    action: (e: any)=>void,
    error?: string | string[]
}

export default function Form({
    title, children, action, submitValue, error
}: IFormOptions){

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        try{
            e.preventDefault();
            setLoading(true);
            await action(e);
        }catch(err){
            console.log("Ocurrio un error!! ", err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <form
            className='form'
            onSubmit={handleSubmit}
        >
            <div className='form-block form-block--title'>
                <p>{ title }</p>
            </div>
            <div className='form-block form-block__comment--error'>
                {error}
            </div>
            {children}
            <div className='form-block form-block--submit'>
                {
                    (!loading) ? (
                        <button 
                            type='submit'
                            className='btn btn--normal'
                        >{submitValue}</button>
                    ) : (
                        <button 
                            type='button'
                            className='btn btn--load'
                        >Loading...</button>
                    )
                }
                
            </div>
        </form>
    );
}