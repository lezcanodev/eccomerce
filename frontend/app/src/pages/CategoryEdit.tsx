import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputText from '../components/InputText';
import { useInputErrors } from '../hooks/useInputErrors';
import { editCategory, getAllCategories } from '../api/category';
import { useApi } from '../hooks/useApi';


export default function CategoryEdit(){
    const category: any = useLoaderData();
    const [loading, categories, setParams] = useApi(getAllCategories);

    const {inputErrors, setErrors} = useInputErrors({
        name: '',
        parent:''
    });

    const handleEditCategory = async (e: any) => {
        const response = await editCategory({
            name: e.currentTarget.name.value,
            parent: e.currentTarget.parent.value,
            categoryId: e.currentTarget.categoryId.value
        });
        
        if(response.errors){
            setErrors(response.errors);
        }

        console.log(response);
    }

    if(!category){
        console.log("??")
       // return <Navigate to='/dashboard/category' />
    }

    console.log(category);

    return <Form
        title='Edit category'
        action={handleEditCategory}
        submitValue='Edit'
    >
               
                
               <FormBlock
                    label='Name'
                    error={inputErrors.name}
                >
                        <InputText
                            name='name'
                            placeholder='name'
                            defaultValue={category.name}
                        />
                </FormBlock>

                <FormBlock
                    label='Parent'
                    error={inputErrors.parent}
                >
                        <select name="parent" 
                                className='input' 
                                defaultValue={category.parentId}
                                >
                            <option value="">None</option>
                            {loading ? <>Loading...</> : (
                                <>
                                    {categories.data.map((ctg: any) => (
          
                                            <option
                                                key={`category-${ctg.id}`}
                                                value={ctg.id}
                                            >{ctg.name}</option>
                            
                                    ))}
                                </>
                            )}
                        </select>
                </FormBlock>
                
                <input
                    type='hidden'
                    name='categoryId'
                    value={category.id}
                />
                    

    </Form>
}