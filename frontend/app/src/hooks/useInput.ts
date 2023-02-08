import { useState } from "react";

const useInput = (defaultValue: string = '') => {
    const [value, setValue] = useState(defaultValue);

    const handleInput = (e: any) => {
        setValue(e.target.value);
    }

    return {value, handleInput};
}

export {useInput};