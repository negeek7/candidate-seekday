import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/multidropdownfilter.module.css';
import { CaretDown, X } from '@phosphor-icons/react';

function MultiDropdownFilter({ filter, handleMultiDropdownFilter, handleRemoveFilter }) {

    const [showDropdown, setShowDropdown] = useState(false)
    const [appliedFilters, setAppliedFilters] = useState([])
    const dropdownRef = useRef(null)
    const dropdownParentRef = useRef(null)

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    useEffect(() => {
        handleMultiDropdownFilter(filter.uid, filter.name, appliedFilters)
    }, [appliedFilters])

    const removeFilter = (value) => {
        setAppliedFilters(prevAppliedFilters => prevAppliedFilters.filter(item => item !== value))
        handleRemoveFilter(filter.uid)
    }

    const handleRoleDropdownClick = (option) => {
        if (appliedFilters.includes(option)) return;
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
                    <X sixe={14} className={styles.filtervaluecross} onClick={() => removeFilter(value)} />
                </div>
            ))
        )
    }

    return (
        <div className={styles.dropdown}>

            <div ref={dropdownParentRef} id="dropdownParent" className={styles.dropdownsubcontainer} onClick={toggleFilters}>
                <div className={styles.appliedFilters}>{!appliedFilters.length ? "Roles" : showAppliedFilterValues()}
                </div>

                <CaretDown size={10} className={styles.downArrow} />
            </div>

            <div ref={dropdownRef} id="myDropdown" className={styles.dropdownContent} style={showDropdown ? showDropDownStyle : hideDropdownStyle}>
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