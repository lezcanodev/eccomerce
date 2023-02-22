import React from "react";

import './table.css';


interface ITableOptions{
    children: React.ReactNode,
    columns: string[],
    loading?: boolean
    tfoot?: React.ReactNode
}

export default function Table({
    children,
    columns,
    tfoot
}: ITableOptions){
    return (
        <table className='table'>
        <thead className='thead'>
            <tr className='tr'>
                {columns.map(column => (
                    <th key={`table-column-${column}`}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody className='tbody'>
            {children}
        </tbody>
        {(tfoot) ? (
            <tfoot className='tfoot'>
                <tr>
                    <td colSpan={100}>
                        {tfoot}
                    </td>
                </tr>
            </tfoot>
        ):(<></>)}

    </table>
    )
}