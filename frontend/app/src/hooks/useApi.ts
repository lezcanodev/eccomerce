import { useEffect, useState } from "react"


const useApi = (callback: (e?: any) => any) => {
    const [loading, setLoad] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [params, setParams] = useState(null);
    const [reLaod, setReLaod] = useState(true);
    
    const call = async () => {
        setLoad(true);
        let response;

        if(params){
            response = await callback(params);
        }else{
            response = await callback();
        }

        setLoad(false);
        setResult(response);
    }
    
    useEffect(() => {
        if(!reLaod) return;
        call();
        setReLaod(false);
    }, [reLaod]);

    useEffect(() => {
        call();
    }, [params]);

    return [ loading, result, setResult, params, setParams, setReLaod];
}

export {
    useApi
}