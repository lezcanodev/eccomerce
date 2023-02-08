import React from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import { publicProduct } from '../api/product';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputFile from '../components/InputFile';
import InputNumber from '../components/InputNumber';
import InputText from '../components/InputText';
import InputTextarea from '../components/InputTextarea';
import { useInputErrors } from '../hooks/useInputErrors';



export default function ProductPublic(){

    const [searchParams, setSearchParams] = useSearchParams();

    const {inputErrors, setErrors} = useInputErrors({
        title: '',
        price:'',
        description: ''
    });

    const handlePublicProduct = async (e: any) => {
        const response = await publicProduct(new FormData(e.target));
        
        if(response.errors){
            setErrors(response.errors);
        }

        console.log(response);
    }

    if(!searchParams.get('categoryname') || !searchParams.get('categoryid')){
        return <Navigate to='/product/category' />
    }


    return <Form
        title='Public product'
        action={handlePublicProduct}
        submitValue='Public'
    >

                <FormBlock
                    label={`Category - ${searchParams.get('categoryname')}`}
                    error={''}
                >   
                        <input
                            type='hidden'
                            name='categoryId'
                            value={Number(searchParams.get('categoryid'))}
                        />
                </FormBlock>
                <FormBlock
                    label='Title'
                    error={inputErrors.title}
                >
                        <InputText
                            name='title'
                            placeholder='title'
                        />
                </FormBlock>
                <FormBlock
                    label='Price'
                    error={inputErrors.price}
                >
                        <InputNumber
                            name='price'
                            placeholder='price'
                        />
                </FormBlock>
                <FormBlock
                    label='Images'
                    error={''}
                >
                        <InputFile
                            name='images'
                            multiple={true}
                        />
                </FormBlock>

                <FormBlock
                    label='Description'
                    error={inputErrors.description}
                >
                        <InputTextarea
                            name='description'
                            placeholder='Description'
                            style={{minHeight:200, resize: 'vertical' }}
                        />
                </FormBlock>
    </Form>
}