import React from 'react';
import { Category, getAllCategories, publicCategory } from '../api/category';
import Form from '../components/Form';
import FormBlock from '../components/FormBlock';
import InputText from '../components/InputText';
import { useApi } from '../hooks/useApi';
import { useInputErrors } from '../hooks/useInputErrors';


export default function CategoryPublic(){
    const [loading, categories] = useApi(getAllCategories);
    
    const {inputErrors, setErrors} = useInputErrors({
        name: '',
        parent: ''
    });

    const handlePublicCategory = async (e: React.FormEvent<{
        name: HTMLInputElement,
        parent: HTMLInputElement
    }>) => {
        const name: string = e.currentTarget.name.value;
        const parent: number = Number(e.currentTarget.parent.value) ?? 0;
        let response;
        if(parent <= 0){
            response = await publicCategory({
                name
            });

        }else{
            response = await publicCategory({
                name,
                parentId: parent 
            });
        }

        if(response.errors){
            setErrors(response.errors);
        }else{
            alert('Success');
        }
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
                        <select name="parent" className='input'>
                            <option value="">None</option>
                            {loading ? <>Loading...</> : (
                                <>
                                    {categories.data.map((ctg: Category) => (
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