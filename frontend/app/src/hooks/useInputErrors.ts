import { useEffect, useState } from "react";

const useInputErrors = (inputs: any) => {
    const [inputErrors, setInputErrors] = useState(inputs);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(typeof errors !== 'undefined' &&
            errors.length > 0){
            
            const actualInputErrors = inputs;

            errors.forEach(({name, message}: {name: string, message: string} )=> {
                actualInputErrors[name] = message; 
            });
  
            setInputErrors({...actualInputErrors});
            setErrors([]);
        }

    }, [errors]);

    return {inputErrors, setErrors};
}

export {useInputErrors};