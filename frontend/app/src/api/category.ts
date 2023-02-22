import api  from "./config";

const BASE_URL = api.resourceUrl({
    resource: 'category'
});

const getCategory = async (categoryId: number) => {

    const response = await fetch(`${BASE_URL}/${categoryId}`);

    const data = await response.json();

    return data;

}

const editCategory = async (UpdateCategory: any) => {

    const response = await fetch(`${BASE_URL}`,{
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(UpdateCategory),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}


const deleteCategory = async (category: number) => {

    const response = await fetch(`${BASE_URL}${category}`,{
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

const getAllCategories = async (format?: 'tree') => {

    const response = await fetch(`${BASE_URL}${(format) ? `?format=${format}`:''}`);

    const data = await response.json();

    return data;

}

const getAllCategoriesWithInfo = async () => {

    const response = await fetch(`${BASE_URL}info`);

    const data = await response.json();

    return data;

}

const getByLevelCategories = async (level?: number) => {
    
    let query= '';
    if(typeof level !== 'undefined'){
        query = `?level=${level}`;
    }

    const response = await fetch(`${BASE_URL}${query}`);

    const data = await response.json();

    return data;

}


const getTreeCategoriesCategories = async () => {

    const response = await fetch(`${BASE_URL}`);

    const data = await response.json();

    return data;

}

interface Category{
    name: string,
    parent ?: number
}

const publicCategory = async (category: Category) => {
 
    const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(category),
        headers: {
            'Content-Type':'application/json'
        }
    });

    const data = await response.json();

    return data;

}




export {
    getAllCategories,
    getByLevelCategories,
    getTreeCategoriesCategories,
    getAllCategoriesWithInfo,
    publicCategory,
    getCategory,
    editCategory,
    deleteCategory
}