import api  from "./config";
const BASE_URL = api.resourceUrl({
    resource: 'user'
});

const _csfr = (new Date()).getMilliseconds()+"======0";
document.cookie = `_csfr=${_csfr}; path=/`;


export interface IUser{
    id: number,
    nick: string,
    rol: {name: string}
}

const getUser = async () => {

    const response = await fetch(`${BASE_URL}`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}


export {
    getUser,
}