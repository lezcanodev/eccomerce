import api  from "./config";

const BASE_URL = api.resourceUrl({
    resource: 'category'
});


export interface Category{
    id: number, 
    name: string,
    parentId : number | null,
}

const getCategory = async (categoryId: number): Promise<Category> => {

    const response = await fetch(`${BASE_URL}/${categoryId}`);

    const data = await response.json();

    return data;

}

const getAllCategories = async (format?: 'tree'): Promise<any> => {

    const response = await fetch(`${BASE_URL}${(format) ? `?format=${format}`:''}`);

    const data = await response.json();

    return data;

}

const getAllCategoriesWithInfo = async (): Promise<{data: (Category & {totalProducts: number})[]}> => {

    const response = await fetch(`${BASE_URL}info`);

    const data = await response.json();

    return data;

}



const publicCategory = async (category: Partial<Category>) => {

    const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            ...category,
            _csfr: api._csfr
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    const data = await response.json();

    return data;

}

const editCategory = async (updateCategory: Partial<Category> & {categoryId: number}) => {

    const response = await fetch(`${BASE_URL}`,{
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
            ...updateCategory,
            _csfr: api._csfr
        }),
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
        credentials: 'include',
        body: JSON.stringify({_csfr: api._csfr}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}

export {
    getAllCategories,
    getAllCategoriesWithInfo,
    publicCategory,
    getCategory,
    editCategory,
    deleteCategory
}