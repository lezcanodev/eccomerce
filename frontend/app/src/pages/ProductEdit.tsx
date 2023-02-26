import React, { MouseEventHandler, useState } from 'react';
import { useSearchParams, Navigate, useLoaderData } from 'react-router-dom';
import { editProduct } from '../api/product';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputFile from '../components/InputFile';
import InputNumber from '../components/InputNumber';
import InputText from '../components/InputText';
import InputTextarea from '../components/InputTextarea';
import { useInputErrors } from '../hooks/useInputErrors';
import { IProduct } from '../api/product';


export default function ProductEdit(){
    const [searchParams] = useSearchParams();
    const product: IProduct = useLoaderData() as IProduct;
    const [removeImages, setRemoveImages] = useState<string[]>([]);

    const {inputErrors, setErrors} = useInputErrors({
        title: '',
        price:'',
        description: ''
    });

    const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        const response = await editProduct(new FormData(e.target as HTMLFormElement));
        
        if(response.errors){
            setErrors(response.errors);
        }

        console.log(response);
    }

    if(!product){
        return <Navigate to='/dashboard/product' />
    }

    if(!searchParams.get('categoryname') || !searchParams.get('categoryid')){
        return <Navigate to='/dashboard/product/category' />
    }
    console.log(product);

    return <Form
        title='Edit product'
        action={handleEditProduct}
        submitValue='Edit'
    >
                <FormBlock
                    label={`Category: ${searchParams.get('categoryname')}`}
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
                            defaultValue={product.title}
                        />
                </FormBlock>
                <FormBlock
                    label='Price'
                    error={inputErrors.price}
                >
                        <InputNumber
                            name='price'
                            placeholder='price'
                            defaultValue={product.price}
                        />
                </FormBlock>
                <FormBlock
                    label='Images'
                    error={''}
                >
                        {product.images.map((image,index) => (
                            <button
                            key={`image-${index}`}
                                className='btn btn--normal'
                                onClick={(e: React.MouseEvent) => {
                                    const t = e.target as HTMLElement;
                                    t.remove()
                                    setRemoveImages([...removeImages, image.image.split('/').splice(-1)[0]]);
                                }}
                            >
                                <img    src={image.image} 
                                    
                                    width={200}
                                    height={200}
                                />
                                remove
                            </button>
                        ))}
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
                            defaultValue={product.description}
                        />
                </FormBlock>
                <input type='hidden' name='product' value={product.id} />
                {removeImages.map(image => (
                    <input  type='hidden' 
                            name='remove-images[]'
                            value={image}
                            key={image}
                    />
                ))}
    </Form>
}