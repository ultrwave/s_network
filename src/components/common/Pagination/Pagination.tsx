import React from 'react';
import Style from './Pagination.module.css';

type PaginationPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChange: (page: number) => void
}


export function Pagination(props: PaginationPropsType) {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={Style.pageButtons}>
            {pages.map(p => {
                return (
                    <span key={p}
                          onClick={() => {props.onPageChange(p)}}
                          className={props.currentPage === p ? Style.selectedPage : ''}>
                          {p}
                    </span>
                )
            })}
        </div>
    )
}

