import React from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import { getAllCategories, publicCategory } from '../api/category';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputText from '../components/InputText';
import { useApi } from '../hooks/useApi';
import { useInputErrors } from '../hooks/useInputErrors';



export default function CategoryPublic(){
    const [loading, categories, setParams] = useApi(getAllCategories);
    
    const {inputErrors, setErrors} = useInputErrors({
        name: '',
        parent: ''
    });

    const handlePublicCategory = async (e: any) => {
        const name: string = e.currentTarget.name.value;
        const parent = e.currentTarget.parent.value;
        let response;
        if(parent.length <= 0){
            response = await publicCategory({
                name
            });

        }else{
            response = await publicCategory({
                name,
                parent 
            });
        }

        if(response.errors){
            setErrors(response.errors);
        }

        console.log(response);
    }


    return <Form
        title='Public category'
        action={handlePublicCategory}
        submitValue='Public'
    >

                <FormBlock
                    label='Name'
                    error={inputErrors.name}
                >
                        <InputText
                            name='name'
                            placeholder='name'
                        />
                </FormBlock>

                <FormBlock
                    label='Parent'
                    error={inputErrors.parent}
                >
                        <select name="parent" id="" className='input'>
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

    </Form>
}