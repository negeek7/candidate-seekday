import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Filters.module.css'
import MultiDropdownFilter from './MultiDropdownFilter';
import SingleDropdownFilter from './SingleDropdownFilter';
import {  handleFilterSelection, handleMinBasePayFilterSelection, handleRoleFilterSelection } from '../../redux/actions/AppActions';

function Filters() {


    const dispatch = useDispatch()
    
    const filterData = useSelector(state => state.app.filterData)

    const handleRoleFilterApply = (filterName, filterValue) => {
        dispatch(handleRoleFilterSelection(filterName, filterValue))
    }
    
    const handleMinBasePayFilterApply = (filterName, filterValue) => {
        dispatch(handleMinBasePayFilterSelection(filterName, filterValue))
    }

    let filterObj = {}

    const handleFilerApply = (name, value) => {
        filterObj[name] = value
        dispatch(handleFilterSelection(filterObj))
    }
    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'multi-dropdown':
                return (
                    <MultiDropdownFilter 
                        filter={filter} 
                        handleRoleFilterApply={handleRoleFilterApply} handleFilerApply={handleFilerApply}
                    />
                )
            case 'single-dropdown':
                return (
                    <SingleDropdownFilter 
                        filter={filter} 
                        handleMinBasePayFilterApply={handleMinBasePayFilterApply} 
                        handleFilerApply={handleFilerApply}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.filterscontainer}>
            {
                filterData.map(filterOption => (
                    <div>
                        {renderFilter(filterOption)}
                    </div>
                ))
            }
        </div>
    )
}

export default Filters