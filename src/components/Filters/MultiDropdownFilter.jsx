import React, { useEffect, useState } from 'react'
import styles from '../../styles/MultiDropdownFilter.module.css';
import { CaretDown, X } from '@phosphor-icons/react';

function MultiDropdownFilter({ filter, handleRoleFilterApply }) {

    const [showDropdown, setShowDropdown] = useState(false)
    const [appliedFilters, setAppliedFilters] = useState([])

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    useEffect(() => {
        handleRoleFilterApply(filter.name, appliedFilters)
    }, [appliedFilters])


    const removeFilter = (value) => {
        setAppliedFilters(prevAppliedFilters => prevAppliedFilters.filter(item => item !== value ))
    }

    
    const handleRoleDropdownClick = (option) => {
        if(appliedFilters.includes(option)) return;
        setAppliedFilters(prevAppliedFilters => [...prevAppliedFilters, ...[option]])
        setShowDropdown(!showDropdown)
    }
    
    const toggleFilters = () => {
        setShowDropdown(!showDropdown)
    }
    
    const showAppliedFilterValues = () => {
        return (
            appliedFilters.map((value, index) => (
                <div className={styles.roleFilterValueContainer} key={index}>
                    <span>{value}</span>
                    <X sixe={14} className={styles.filtervaluecross} onClick={() => removeFilter(value)}/>
                </div>
            ))
        )
    }

    return (
        <div className={styles.dropdown}>

            <div className={styles.dropdownsubcontainer}>
                <div className={styles.appliedFilters}>{!appliedFilters.length ? "Roles" : showAppliedFilterValues()}
                </div>
                
                <CaretDown size={10}  onClick={toggleFilters} className={styles.downArrow}/>
            </div>

            <div id="myDropdown" className={styles.dropdownContent} style={showDropdown ? showDropDownStyle : hideDropdownStyle}>
                {
                    filter.options.map((option, index) => (
                        <span
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handleRoleDropdownClick(option)}
                        >
                            {option}
                        </span>
                    ))
                }
            </div>

        </div>
    )
}

export default MultiDropdownFilter