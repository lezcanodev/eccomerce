import { ValidationError } from "ajv";

interface IError{
    name: string,
    message: string
}

export default class AjvHelper{
    public static parseAjvErrors(err: ValidationError): IError[]{
        const errors: IError[] = [];
        err.errors.forEach(({message, instancePath}: any) => {
            const propertyName = instancePath.split('/')[1];
            errors.push({
                name: propertyName,
                message
            });
        });

        return errors;
    } 
}