import React, { useState } from "react";
import InputText from "../components/InputText";
import Form from "../components/Form";
import FormBlock from "../components/FormBlock";
import { signup } from "../api/auth";
import InputPassword from "../components/InputPassword";
import InputEmail from "../components/InputEmail";
import { useInputErrors } from "../hooks/useInputErrors";

export default function Signup(){
    const {inputErrors, setErrors} = useInputErrors({
        nick: '',
        email:'',
        password: ''
    });

    const handleRegister = async (e: any) => {

        const response = await signup({
            nick: e.target['nick'].value,
            email: e.target['email'].value,
            password: e.target['password'].value
        });

        if(response.errors){
            setErrors(response.errors);
        }

    } 

    return (
            <Form
                title='Register'
                action={handleRegister}
                submitValue='signup'
            >
                <FormBlock
                    label='Nick'
                    error={inputErrors.nick}
                >
                        <InputText
                            name='nick'
                            placeholder='nick'
                        />
                </FormBlock>
                <FormBlock
                    label='Email'
                    error={inputErrors.email}
                >
                        <InputEmail
                            name='email'
                            placeholder='email'
                        />
                </FormBlock>
                <FormBlock
                    label='Password'
                    error={inputErrors.password}
                >
                        <InputPassword
                            name='password'
                            placeholder='password'
                        />
                </FormBlock>
            </Form>
    );
}