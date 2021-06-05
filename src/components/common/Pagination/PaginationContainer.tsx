import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import PaginationDisplay from "./PaginationDisplay";
import {setCurrentPageAC, setItemsOnPageAC} from "../../../redux/pagination-reducer";
import {StateType} from '../../../types/types';
import {setPageSize} from '../../../redux/users-reducer';

type PaginationStateType = {
    page: number
    pageCount: number
}

export type PaginationContainerPropsType = {
    totalItems: number
    onPageChange(page: number): void
}

function PaginationContainer({totalItems, onPageChange}: PaginationContainerPropsType) {
    const dispatch = useDispatch()
    const paginationState = useSelector((state: StateType): PaginationStateType => state.pagination)


    const getPage = (currentPage: number) => {
        onPageChange(currentPage)
        dispatch(setCurrentPageAC(currentPage))
    }

    const getItemsOnPage = (itemsOnPage: number) => {
        dispatch(setItemsOnPageAC(itemsOnPage))
    }

    const changePageSize = (pageSize: number) => {
        dispatch(setPageSize(pageSize))
    }

    return (
        <div>
            <PaginationDisplay
                currentPage={paginationState.page}
                itemsOnPage={paginationState.pageCount}
                totalItems={totalItems}
                getPage={getPage}
                changePageSize={changePageSize}
                getItemsOnPage={getItemsOnPage}
            />
        </div>
    );
}

export default PaginationContainer;
