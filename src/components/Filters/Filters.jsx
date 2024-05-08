import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Filters.module.css'
import MultiDropdownFilter from './MultiDropdownFilter';

function Filters() {


    const dispatch = useDispatch()
    const filterData = useSelector(state => state.app.filterData)

    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'multi-dropdown':
                return (
                    <MultiDropdownFilter filter={filter} />
                )
            default:
                return null
        }
    }

    return (
        <div>
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