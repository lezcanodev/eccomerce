import React from 'react';
import TreeCategories from '../components/TreeCategories';
import { useApi } from '../hooks/useApi';
import { getPartialProducts } from '../api/product';
import Header from './layouts/Header';
import Product from '../components/Product';

import './home.css';
import Pagination from '../components/Pagination';
import {  useSearchParams } from 'react-router-dom';

export default function Home(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(1);
    const [loadingProducts, products, setResult, params, setParams, setReLaod] = useApi(getPartialProducts);

    React.useEffect(() => {

        const s = setTimeout(() => {
        
            if(query.trim().length <= 0){
                if(params) delete params.query;
                if(searchParams.get('query')){
                    setParams({...params, page:1,
                    query: searchParams.get('query') });
                    return
                }
                setParams({...params, page:1});
                return;

                
            }else{
                setParams({...params,
                    page:1,
                    query});
            }

            setPage(1);
        }, 500 );

        return () => {
            clearTimeout(s);
        }
    }, [query]);

    React.useEffect( () => {
        setParams({
            ...params,
            page
        });
    }, [page]);

    const handleCategory = (category: number | null) => {
        if(category){
            setParams({
                ...params,
                page:1,
                category
            });
        }else{
            delete params.category;
            setParams({...params, page:1});
        }
    } 


    return (
        <>
            <Header 
                setQuery={setQuery}
                defaultQuery={searchParams.get('query') ?? ''}
            />

            <main className='main'>
                <div className='main-aside'>
                    <TreeCategories
                        setCategory={handleCategory}
                    />
                </div>
                <div className='main-products'>
                    {(loadingProducts) ? <>Loading...</> : (<>
                        <div className='products' >
                            
                        {(products.data.length > 0 ) ? products.data.map((product: any) => (
                                <Product
                                    key={`product-key${product.id}`}
                                    product={product}
                                />
                        )) : <>No products</>}
                        
                        </div>
                        <div className='main-products-pagination'>
                            <Pagination
                                currentPage={page}
                                totalPages={products.totalPages}
                                showPages={5}
                                initialCurrentPage={1}
                                setPage={setPage}
                            />
                        </div>
                    </>)}
                </div>


            </main>
        </>
    );
}

