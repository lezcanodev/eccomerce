import api  from "./config";

const BASE_URL = api.resourceUrl({
    resource: 'product'
});

export interface IProduct{
    active: boolean,
    createAt: string,
    description: string,
    id: string,
    images: {image: string}[],
    modifiedAt: string,
    price: string,
    title: string,
    user: {
        id:number,
        nick: string
    },
    category: {
        id:number,
        name: string
    }
}





const publicProduct = async (formData: FormData) => {
    //formData.append('_csfr', api._csfr);
    const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = await response.json();

    return data;

}

const editProduct = async (formData: FormData) => {

    const response = await fetch(`${BASE_URL}`,{
        method: 'PUT',
        credentials: 'include',
        body: formData
    });

    const data = await response.json();

    return data;

}

interface IProductFilter{
    page: number,
    category ?: number,
    query ?: string
}

const getPartialProducts = async (filters: IProductFilter = {
    page: 1
}) => {
    
    const queries = new URLSearchParams();

    queries.append('page', filters.page.toString()  )
    
    if(filters.category){
        queries.append('category', filters.category.toString())
    }

    if(filters.query){
        queries.append('query', filters.query)
    }


    const response = await fetch(`${BASE_URL}partial?${queries.toString()}`);
    const data = await response.json();
    return data;
}

const deleteProduct = async (product: string) => {

    const response = await fetch(`${BASE_URL}?product=${product}`,{
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

const changeStateProduct = async (product: string) => {

    const response = await fetch(`${BASE_URL}change-state/${product}`,{
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

const getProduct = async (product: string): Promise<IProduct | null> => {
    if(product.trim().length <= 0) return null;

    const response = await fetch(`${BASE_URL}/${product}`);
    const data = await response.json();
    return data;
}



export {
    publicProduct,
    getPartialProducts,
    getProduct,
    editProduct,
    deleteProduct,
    changeStateProduct
}