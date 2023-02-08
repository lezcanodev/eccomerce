import React, { useEffect, useState } from 'react';
import { getAll } from '../api/category';

import './categories.css';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';

export default function Categories(){
    const [loading, categories, setParams] = useApi(getAll);
    const [categoryComponents, setCategoryComponent] = useState<React.ReactNode[]>([]);
    
    if(loading){
        return <>loading...</>;
    }

    if(!categories){
        return <>There arent categories</>; 
    }    

    return  <>
            
            <div className='categories'>
                <p className='title'>Categories</p>
               {
                categories.categories.map((ctg: any) => (
                   <Link 
                        key={`category--${ctg.id}`}
                        to={`/product/public?categoryid=${ctg.id}&categoryname=${ctg.name}`}
                        className='categories__category'    >
                    {ctg.name}
                   </Link>
                ))
               }
            </div>
    </>
}