import React from "react";

import './pagination.css';

interface IPaginationOptions{
    totalPages: number,
    showPages: number,
    initialCurrentPage: number,
    currentPage: number,
    setPage: (page: number) => void
}

export default function Pagination({
    totalPages,
    showPages,
    initialCurrentPage,
    currentPage,
    setPage
}: IPaginationOptions){
    const [pages, setPages] = React.useState<number[]>([]);

    React.useEffect(() => {
        const newPages: number[] = []
        let tempShowPages = showPages;
        if(currentPage-2 >= 0){ 
            const p = (currentPage-2 <= 0) ? 1 : currentPage-2;

            for(let i= p; i < currentPage; i++){
                if(i <= totalPages){
                    console.log(i)
                    newPages.push(i);
                    tempShowPages-=1;
                }
            }
        }

        for(let i=currentPage; i < (currentPage+showPages); i++){
            if(i <= totalPages){
                newPages.push(i);
            }else break;
        }
        
        setPages(newPages);
        setPage(currentPage);
    }, [currentPage])

    const handlePage = (page: number) => {
        if(page > totalPages || page < 1 ) return;
        setPage(page);
    }

    return(                                    
    <ul className='pagination'>
        <li onClick={() => handlePage(1)}
            className='pagination-page pagination-page--selected'>
                {'<<'}
        </li>
        <li onClick={() => handlePage(currentPage-1)}
            className='pagination-page pagination-page--selected'>
                {'<'}
        </li>
        {pages.map(page => (
            <li key={`pagination-page-${page}`}
                onClick={() => handlePage(page)}
                className={`pagination-page ${(page === currentPage) ?'pagination-page--selected':''}`}>
                    {page}
            </li>
        ))}
        <li onClick={() => handlePage(currentPage+1)}
            className='pagination-page pagination-page--selected'>{'>'}</li>
        <li onClick={() => handlePage(totalPages)}
            className='pagination-page pagination-page--selected'>{'>>'}</li>
    </ul>
    );
}