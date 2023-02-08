import path from "path";

interface IStorageInfo{
    path: string
}

interface IStorage{
    [name: string]: IStorageInfo
}
const STORAGES: IStorage = {
    'public': {
        path: path.join(__dirname, '..', '..', 'public', 'uploads')
    }
};

export default STORAGES;