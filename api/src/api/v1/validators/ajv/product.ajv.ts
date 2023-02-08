import Category from "../../../../entities/category.entity";
import ajv from "./ajv";


const StoreProductValidate = ajv.compile({
    $async: true,
    type: 'object',
    properties: {
        categoryId:{
            type: 'string',
            'exist': {
                entity: Category,
                column: 'id'
            }
        },
        title:{
            type: 'string',
            minLength: 5
        },
        description:{
            type: 'string'
        },
        price:{
            type: 'string',
            minLength: 1
        },
        files: {
            type: 'object'
        }
    },
    required: ['categoryId', 'title', 'price']
});

export {
    StoreProductValidate
}