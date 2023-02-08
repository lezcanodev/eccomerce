import Ajv from "ajv";
import addFormats from 'ajv-formats';
import EntityHelper, { IEntityExist } from "../../../../entities/helper.entity";

const ajv = new Ajv({
    allErrors: true
});
addFormats(ajv);


ajv.addKeyword({
    keyword: 'noExist',
    async: true,
    validate: async (data: IEntityExist, value: number | string): Promise<Boolean> => {
        return !(await EntityHelper.exist(data, value));
    },
    error:{
        message: (cxt: any) => {
            const propertyName: string = cxt.it.errSchemaPath.split('/')[2];
            return `The ${propertyName} already been taken`;
        }
    }
});


ajv.addKeyword({
    keyword: 'exist',
    async: true,
    validate: EntityHelper.exist,
    error:{
        message: (cxt: any) => {
            const propertyName: string = cxt.it.errSchemaPath.split('/')[2];
            return `The ${propertyName} doesnt exist`;
        }
    }
});

export default ajv;