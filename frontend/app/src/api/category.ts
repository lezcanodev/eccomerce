import api  from "./config";

const BASE_URL = api.resourceUrl({
    resource: 'category'
});

const getAll = async () => {

    const response = await fetch(`${BASE_URL}`);

    const data = await response.json();

    return data;

}

const getByLevel = async (level?: number) => {
    
    let query= '';
    if(typeof level !== 'undefined'){
        query = `?level=${level}`;
    }

    const response = await fetch(`${BASE_URL}${query}`);

    const data = await response.json();

    return data;

}


const getTreeCategories = async () => {

    const response = await fetch(`${BASE_URL}`);

    const data = await response.json();

    return data;

}



export {
    getByLevel,
    getTreeCategories,
    getAll
}