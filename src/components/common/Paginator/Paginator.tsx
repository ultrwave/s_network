import React from 'react';
import Style from './Paginator.module.css';

type PaginationPropsType = {
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    onPageChange: (page: number) => void
}


export function Paginator(props: PaginationPropsType) {

    const pagesCount = Math.ceil(props.totalUsersCount / props.itemsOnPage)

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

