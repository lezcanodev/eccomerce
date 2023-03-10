import React, { useState } from "react";
import InputText from "../components/InputText";
import Form from "../components/Form";
import FormBlock from "../components/FormBlock";
import { signin } from "../api/auth";
import InputPassword from "../components/InputPassword";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/userProvider";

export default function Signin(){
    const userCtx = React.useContext(UserContext);

    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = async (e: any) => {

        const response = await signin({
            nickOrEmail: e.target['nick-or-email'].value,
            password: e.target['password'].value
        });

        if(response.error){
            setFormError(response.error);
            return;
        }
        await userCtx.handleGetUser();
        navigate('/');
    } 

    return (
            <Form
                title='Login'
                action={handleRegister}
                submitValue='signin'
                error={formError}
            >
                <FormBlock
                    label='Nick or Email'
                >
                        <InputText
                            name='nick-or-email'
                            placeholder='nick or email'
                        />
                </FormBlock>
                <FormBlock
                    label='Password'
                >
                        <InputPassword
                            name='password'
                            placeholder='password'
                        />
                </FormBlock>
            </Form>
    );
}