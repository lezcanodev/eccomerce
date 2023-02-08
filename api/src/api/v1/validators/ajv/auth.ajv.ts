import User from "../../../../entities/user.entity";
import ajv from "./ajv";


const authSignupValidate = ajv.compile({
    $async: true,
    type: 'object',
    properties: {
        'nick':{
            type: 'string',
            minLength: 2,
            'noExist': {
                entity: User,
                column: 'nick'
            }
        },
        'email':{
            type: 'string',
            format: 'email',
            'noExist': {
                entity: User,
                column: 'email'
            }
        },
        'password':{
            type: 'string',
            minLength: 6
        },
        '_csfr':{
            type: 'string'
        }
    },
    required: ['_csfr', 'nick','email','password'],
    additionalProperties: false
});


const authSigninValidate = ajv.compile({
    $async: true,
    type: 'object',
    properties: {
        'nickOrEmail':{
            type: 'string'
        },
        'password':{
            type: 'string'
        },
        '_csfr':{
            type: 'string'
        }
    },
    required: ['_csfr','password','nickOrEmail'],
    additionalProperties: false
});



export {
    authSignupValidate,
    authSigninValidate
}