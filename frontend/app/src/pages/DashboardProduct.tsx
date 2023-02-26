import React from 'react';
import { Link } from 'react-router-dom';
import { changeStateProduct, deleteProduct, getPartialProducts } from '../api/product';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { useApi } from '../hooks/useApi';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import './dashboardProduct.css';

export default function DashboardProduct(){
    const [loading, products, setProducts, params, setParams, setReLaod] = useApi(getPartialProducts);
    const [page, setPage] = React.useState<number>(1);

    React.useEffect(() => {
        setParams({
            ...params,
            page: 1
        });
    }, [])

    React.useEffect( () => {
        setParams({
            ...params,
            page
        });
    }, [page]);

    const handleDeleteProduct = async (product: string) => {
       const res = await deleteProduct(product);
       setReLaod(true);
       console.log(res);
    }

    const handleStateProduct = async (e: any, product: string) => {
        
        const res = await changeStateProduct(product);

        setProducts({
            ...products,
            data: products.data.map((p:any) => {
                if(p.id === product){
                    return {
                        ...p,
                        active: !p.active
                    }
                }
                return p;
            })
        });

        console.log('change state product ', res);

    }

    return ( 
    <section className='ds-page ds-product'>
        <div className='ds-product-header'>
            <Link 
                className='btn btn--normal'
                to='/dashboard/product/public'>
                    Public
            </Link>
        </div>
        <div className='ds-product-body' style={{
                display: 'flex',
                justifyContent: 'center'
        }}>
                { loading ? 'loading...' : (
                <Table
                    columns={[  'State',
                                'Title',
                                'Price',
                                'category',
                                'user',
                                'create at',
                                'modified at',
                                'Actions']}
                    loading={loading}
                    tfoot={<Pagination 
                        totalPages={products.totalPages}
                        showPages={5}
                        currentPage={page}
                        initialCurrentPage={1}
                        setPage={setPage}
                    />}
                >
                        {products.data.map((product: any) => (
                            <tr key={`product-table-${product.id}`}>
                                <td className={`btn ${product.active ? 'product-public' : 'product-private'}`}

                                onClick={(e) => handleStateProduct(e, product.id)}
                                >

                                    {product.active ? (
                                        <><AiFillEye />
                                        <br/>
                                        <span>public</span></>
                                    ):(
                                        <><AiFillEyeInvisible />
                                        <br/>
                                        <span>private</span></>
                                    )}
                                     
                                </td>
                                <td className='text-ellipsis'>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.category?.name}</td>
                                <td>{product.user.nick}</td>
                                <td>{(new Date(product.createAt)).toLocaleString()}</td>
                                <td>{(new Date(product.modifiedAt)).toLocaleString()}</td>
                                <td className='table-row-actions'>
                                    <Link
                                        to={`/dashboard/product/category?product=${product.id}&category=${product.category?.id}`}
                                    >
                                        <FaEdit
                                            className='table-row-action'
                                        />
                                    </Link>
                                    <AiFillDelete
                                        className='table-row-action'
                                        onClick={(e) => handleDeleteProduct(product.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                </Table>)
                }
        </div>

    </section>
    )

}