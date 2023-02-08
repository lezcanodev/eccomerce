interface IResourceUrl{
    resource: string,
    apiVersion ?: string
}

interface IApiConfig  {
    baseUrl: string,
    defaultApiVersion: string,
    resourceUrl: (resource: IResourceUrl) => string,
    readonly _csfr: string
}

const api: IApiConfig = {
    baseUrl: 'http://localhost:3002',
    defaultApiVersion: 'v1',
    resourceUrl: function({resource , apiVersion}: IResourceUrl): string{
        if(!apiVersion){
            apiVersion = this.defaultApiVersion;
        }
        return  `${this.baseUrl}/${apiVersion}/${resource}/`; 
    },
    _csfr: (new Date()).getMilliseconds()+"<-token"
}

export default api;