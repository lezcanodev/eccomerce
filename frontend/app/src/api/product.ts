import api  from "./config";

const BASE_URL = api.resourceUrl({
    resource: 'product'
});

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

export {
    publicProduct
}