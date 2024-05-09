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
        // dispatch(handleRoleFilterSelection({filterName, filterValues}))
        dispatch(handleRoleFilterSelection({filterName, filterValues}))
    }
    
    const handleSingleDropdownFilter = (id, filterName, filterValue) => {
        if(id == "min-basepay-filter"){
            dispatch(handleMinBasePayFilterSelection({id, filterName, filterValue}))
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
        switch (filter.type) {
            // case 'multi-dropdown-roles':
            //     return (
            //         <MultiDropdownFilter 
            //             filter={filter} 
            //             handleMultiDropdownFilter={handleMultiDropdownFilter}
            //         />
            //     )

            case 'single-dropdown':
                return (
                    <SingleDropdownFilter 
                        handleSingleDropdownFilter={handleSingleDropdownFilter}
                        filter={filter}
                    />
                )

            case "text":
                return (
                    <InputFilter 
                        filter={filter}
                        handleTextFilter={handleTextFilter}
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