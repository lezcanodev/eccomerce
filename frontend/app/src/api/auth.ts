import api  from "./config";
const BASE_URL = api.resourceUrl({
    resource: 'auth'
});

interface ISignin{
    nickOrEmail: string,
    password: string
}

const signin = async (user: ISignin) => {
    
    const response = await fetch(`${BASE_URL}signin`,{
        method: 'POST',
        body: JSON.stringify({
            _csfr: api._csfr,
            ...user
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    

    const data = await response.json();

    return data;
}

interface ISignup{
    nick: string,
    email: string,
    password: string
}

const signup = async (user: ISignup) => {

    const response = await fetch(`${BASE_URL}signup`,{
        method: 'POST',
        body: JSON.stringify({
            _csfr: api._csfr,
            ...user
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}


export {
    signin,
    signup
}