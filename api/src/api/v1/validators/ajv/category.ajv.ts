import Category from "../../../../entities/category.entity";
import ajv from "./ajv";


const storeCategoryValidate = ajv.compile({
    $async: true,
    type: 'object',
    properties: {
        'name':{
            type: 'string',
            minLength: 2
        },
        'parent':{
            type: 'string',
            'exist': {
                entity: Category,
                column: 'id'
            }
        }
    },
    required: [ 'name' ]
});


const updateCategoryValidate = ajv.compile({
    $async: true,
    type: 'object',
    properties: {
        'categoryId':{
            type: 'string',
            'exist': {
                entity: Category,
                column: 'id'
            }
        },
        'name':{
            type: 'string',
            minLength: 2
        },
        'parent':{
            type: 'string',
            /*'exist': {
                entity: Category,
                column: 'id'
            }*/
        }
    },
    required: [ 'name', 'categoryId' ]
});




export {
    storeCategoryValidate,
    updateCategoryValidate
}