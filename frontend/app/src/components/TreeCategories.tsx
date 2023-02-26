import React from 'react';
import { getAllCategories } from '../api/category';
import { useApi } from '../hooks/useApi';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import './treeCategories.css';

export default function TreeCategories({
    setCategory
}: any){
    const [currentCategory, setCurrentCategory] = React.useState<number>(-1);
    const [ loading, treeCategories] = useApi(async () => {
        return await getAllCategories('tree')
    });

    React.useEffect(() => {
        if(loading) return;
        console.log(treeCategories);
    }, [loading])

    const handleCategory = (e: any, category: number) =>{
        e.stopPropagation();
        setCategory(category);
        setCurrentCategory(category);
    }

    if(loading) return <>Nada</>;

    return (
        <div 
            className='tree'
        >
                <div
                    className='tree-node'
                    onClick={(e) =>{setCategory(null); setCurrentCategory(-1)}}

                >
                    <div
                        className={`tree-node-name ${currentCategory == -1 ? 'tree-node--active' : ''}`}>
                        All
                    </div>
                </div>
            {treeCategories.data.map( (ctg: any) => (
                
                <div
                    onClick={(e) => handleCategory(e, ctg.id)}
                    key={`root-category-${ctg.id}`}
                    className='tree-node'
                >
                    <div
                        className={`tree-node-name ${currentCategory === ctg.id ? 'tree-node--active' : ''}`}
                    >
                        {ctg.name}
                        {(ctg.children.length > 0) ? (
                           <> {/*<AiOutlinePlusCircle/>*/}</>
                        ):(<></>)}
                    </div>

                    <ChildrenCategory
                        handleCategory={handleCategory}
                        childrenCategories={ctg.children}
                        currentCategory={currentCategory}
                    />

                </div>
            ))}
        </div>
    );
}


function ChildrenCategory({childrenCategories, handleCategory, currentCategory}: any){

    return <div
        className='tree-children'
    >
        {
            childrenCategories.map((ch: any) => (
                <div
                    onClick={(e) => handleCategory(e, ch.id)}
                    key={`tree-category-children-${ch.id}`}
                    className='tree-node tree-node--children'>
                   <div
                      className={`tree-node-name ${currentCategory === ch.id ? 'tree-node--active' : ''}`}>
                        {ch.name}
                        {(ch.children.length > 0) ? (
                                <> {/*<AiOutlinePlusCircle/>*/}</>
                        ):(<></>)}
                   </div>
                    {(ch.children.length > 0)? (
                        <ChildrenCategory
                            handleCategory={handleCategory}
                            childrenCategories={ch.children}
                            currentCategory={currentCategory}
                        />
                    ) : (<></>)}

                </div>
            ))
        }
    </div>
}