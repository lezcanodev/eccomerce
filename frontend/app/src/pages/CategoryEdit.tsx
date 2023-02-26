import React  from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputText from '../components/InputText';
import { useInputErrors } from '../hooks/useInputErrors';
import { Category, editCategory, getAllCategories } from '../api/category';
import { useApi } from '../hooks/useApi';


export default function CategoryEdit(){
    const category: Category = useLoaderData() as Category;
    const [loading, categories] = useApi(getAllCategories);

    const {inputErrors, setErrors} = useInputErrors({
        name: '',
        parent:''
    });

    const handleEditCategory = async (e: React.FormEvent<{
        name: HTMLInputElement,
        parent: HTMLInputElement,
        categoryId: HTMLInputElement
    }>) => {

        const response = await editCategory({
            name: e.currentTarget.name.value,
            parentId: Number(e.currentTarget.parent.value),
            categoryId: Number(e.currentTarget.categoryId.value)
        });
        
        if(response.errors){
            setErrors(response.errors);
        }else{
            alert('success');
        }        
    }

    if(!category){
       return <Navigate to='/dashboard/category' />
    }

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
                                defaultValue={String(category.parentId)}
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