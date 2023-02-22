import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/category';

import './categories.css';
import { useApi } from '../hooks/useApi';
import { Link, useSearchParams } from 'react-router-dom';

export default function Categories(){
    const [loading, categories, setParams] = useApi(getAllCategories);
    const [searchParams, setSearchParams] = useSearchParams();


    if(loading){
        return <>loading...</>;
    }

    if(!categories){
        return <>There arent categories</>; 
    }    

    const handleNextPage = (ctgId: number, ctgName: string): string => {
        if(!searchParams.get('product')){
            return `/dashboard/product/public?categoryid=${ctgId}&categoryname=${ctgName}`;
        }

        return `/dashboard/product/edit/${searchParams.get('product')}?categoryid=${ctgId}&categoryname=${ctgName}`;
    }

    return  <>
            
            <div className='categories'>
                <p className='title'>Categories</p>
               {
                categories.data.map((ctg: any) => (
                   <Link 
                        key={`category--${ctg.id}`}
                        to={handleNextPage(ctg.id, ctg.name)}
                        className={
                        `categories__category ${(searchParams.get('category') && ctg.id == searchParams.get('category')) ? 'categories__category--selected' : ''}` 
                        }    >
                    {ctg.name}
                   </Link>
                ))
               }
            </div>
    </>
}