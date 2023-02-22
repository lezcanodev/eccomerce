import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory, getAllCategoriesWithInfo } from '../api/category';
import Table from '../components/Table';
import { useApi } from '../hooks/useApi';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

export default function DashboardCategory(){
    const [loading, categories, setCategories, params, setParams, setReLaod] = useApi(getAllCategoriesWithInfo);

    const handleDeleteCategory = async (e:any, category: number) => {
        await deleteCategory(category);
        setCategories((prevCategories: any) => ({
            ...categories,
            data: prevCategories.data.filter((ctg: any) =>  ctg.id !== category)
        }));
    }

    return (
        <section className='ds-page ds-category'>
            <div className='ds-product-header'>
            <Link 
                className='btn btn--normal'
                to='/dashboard/category/public'>
                    Public
            </Link>
        </div>
        <div className='ds-product-body' style={{
                display: 'flex',
                justifyContent: 'center'
        }}>
                { loading ? 'loading...' : (
                <Table
                    columns={[  'Name',
                                'Total products', 
                                'Actions']}
                    loading={loading}
                >
                        {categories.data.map((category: any) => (
                            <tr key={`category-table-${category.id}`}>
    
                                <td className='text-ellipsis'>{category.name}</td>
                                <td>{category.totalProducts}</td>
                                <td className='table-row-actions'>
                                    <Link
                                        to={`/dashboard/category/edit/${category.id}`}
                                    >
                                        <FaEdit
                                            className='table-row-action'
                                        />
                                    </Link>
                                    <AiFillDelete
                                        className='table-row-action'
                                        onClick={(e) => handleDeleteCategory(e, category.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                </Table>)
                }
        </div>

        </section>
    );
      

}