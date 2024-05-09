import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Filters.module.css'
import MultiDropdownFilter from './MultiDropdownFilter';
import SingleDropdownFilter from './SingleDropdownFilter';
import InputFilter from './InputFilter';
import {  handleMinBasePayFilterSelection, handleRoleFilterSelection } from '../../redux/actions/AppActions';

function Filters() {

    const dispatch = useDispatch()
    
    const filterData = useSelector(state => state.app.filterData)

    const handleMultiDropdownFilter = (filterName, filterValues) => {
        dispatch(handleRoleFilterSelection({filterName, filterValues}))
    }
    
    const handleSingleDropdownFilter = (filterName, filterValue) => {
        if(filterName == "Minimum Base Pay"){
            dispatch(handleMinBasePayFilterSelection({filterName, filterValue}))
        } else if (filterName == "Minimum Experience"){
            console.log("min experience filter")
        } else  if (filterName == "Remote / On site") {
            console.log("remote filter")
        }
    }

        const handleTextFilter = () => {
            console.log("handle text filter")
        }
    
    const renderFilter = (filter) => {
        console.log(filter, "FFAA")
        switch (filter.type) {
            case 'multi-dropdown-roles':
                return (
                    <MultiDropdownFilter 
                        filter={filter} 
                        handleMultiDropdownFilter={handleMultiDropdownFilter}
                    />
                    // <p>Hello</p>
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.filterscontainer}>
                {
                    filterData?.map((filterOption, index) => (
                        <div key={index}>
                            {renderFilter(filterOption)}
                        </div>
                    ))
                }
        </div>
    )
}

export default Filters