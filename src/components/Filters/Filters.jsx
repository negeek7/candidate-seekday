import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Filters.module.css'
import MultiDropdownFilter from './MultiDropdownFilter';
import SingleDropdownFilter from './SingleDropdownFilter';
import InputFilter from './InputFilter';
// import { filtersApplied, handleCompanyNameSelection, handleLocationFilterSelection, handleMinBasePayFilterSelection, handleMinExpFilterSelection, handleRemoteOnsiteFilterSelection, handleRoleFilterSelection } from '../../redux/actions/AppActions';
import { filtersAppliedAction, removeAppliedFilters } from '../../redux/actions/AppActions';
import { companyNameFilter, locationFilter, minBasePayFilter, minExperienceFilter, remoteOnSiteFilter } from '../../../constants/filterConstants';

function Filters({ filtersApplied }) {

    const dispatch = useDispatch()

    const filterData = useSelector(state => state.app.filterData)

    const handleMultiDropdownFilter = (filterName, filterValues) => {
        // dispatch(handleRoleFilterSelection({ filterName, filterValues }))
        console.log("multi drop down filter")
    }

    const handleSingleDropdownFilter = (id, filterName, filterValue) => {
        dispatch(filtersAppliedAction({ name: id, value: filterValue }))
    }

    const handleTextFilter = (id, filterName, filterValue) => {
        if(filterValue == '' && filtersApplied[id]){
            console.log(id, "empty value for text input")
            dispatch(removeAppliedFilters(id, true))
        } else {
            dispatch(filtersAppliedAction({name: id, value: filterValue}))
        }
    }

    const handleRemoveFilter = (id) => {
        dispatch(removeAppliedFilters(id, true))
    }

    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'multi-dropdown-roles':
                return (
                    <MultiDropdownFilter 
                        filter={filter} 
                        handleMultiDropdownFilter={handleMultiDropdownFilter}
                    />
                )

            case 'single-dropdown':
                return (
                    <SingleDropdownFilter
                        handleSingleDropdownFilter={handleSingleDropdownFilter}
                        handleRemoveFilter={handleRemoveFilter}
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