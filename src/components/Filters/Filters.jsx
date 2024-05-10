import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Filters.module.css'
import MultiDropdownFilter from './MultiDropdownFilter';
import SingleDropdownFilter from './SingleDropdownFilter';
import InputFilter from './InputFilter';
import { handleCompanyNameSelection, handleLocationFilterSelection, handleMinBasePayFilterSelection, handleMinExpFilterSelection, handleRemoteOnsiteFilterSelection, handleRoleFilterSelection } from '../../redux/actions/AppActions';
import { companyNameFilter, locationFilter, minBasePayFilter, minExperienceFilter, remoteOnSiteFilter } from '../../../constants/filterConstants';

function Filters() {

    const dispatch = useDispatch()

    const filterData = useSelector(state => state.app.filterData)

    const handleMultiDropdownFilter = (filterName, filterValues) => {
        // dispatch(handleRoleFilterSelection({filterName, filterValues}))
        dispatch(handleRoleFilterSelection({ filterName, filterValues }))
    }

    const handleSingleDropdownFilter = (id, filterName, filterValue) => {
        if (id == minBasePayFilter) {
            dispatch(handleMinBasePayFilterSelection({ id, filterName, filterValue }))
        } else if (id == minExperienceFilter) {
            dispatch(handleMinExpFilterSelection({ id, filterName, filterValue }))
        } else if (id == remoteOnSiteFilter) {
            dispatch(handleRemoteOnsiteFilterSelection({ id, filterName, filterValue }))
        }
    }

    const handleTextFilter = (id, filterName, filterValue) => {
        if (id === locationFilter) {
            dispatch(handleLocationFilterSelection({ id, filterName, filterValue }))
        } else if (id === companyNameFilter) {
            dispatch(handleCompanyNameSelection({ id, filterName, filterValue }))
        }
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