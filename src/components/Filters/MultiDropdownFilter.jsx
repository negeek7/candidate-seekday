import React, { useEffect, useState } from 'react'
import styles from '../../styles/MultiDropdownfilter.module.css';
import { CaretDown, X } from '@phosphor-icons/react';

function MultiDropdownFilter({ filter }) {

    const [showDropdwon, setShowDropdown] = useState(false)
    const [appliedFilters, setAppliedFilters] = useState([])

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    useEffect(() => {
        console.log("applied filters changed")
    }, [appliedFilters])


    const removeFilter = (value) => {
        console.log(value, "VALUEE")
        setAppliedFilters(prevAppliedFilters => prevAppliedFilters.filter(item => item !== value ))
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

    const handleRoleDropdownClick = (option) => {
        if(appliedFilters.includes(option)) return;
        setAppliedFilters(prevAppliedFilters => [...prevAppliedFilters, ...[option]])
    }

    const toggleFilters = () => {
        setShowDropdown(!showDropdwon)
    }


    console.log(appliedFilters, "APPLIED FILTERS")


    return (
        <div class={styles.dropdown}>

            <div className={styles.dropdownsubcontainer}>
                <div className={styles.appliedFilters}>{!appliedFilters.length ? "Roles" : showAppliedFilterValues()}
                </div>
                
                <button onClick={toggleFilters}>
                    <CaretDown size={10} />
                </button>
            </div>

            <div id="myDropdown" class={styles.dropdownContent} style={showDropdwon ? showDropDownStyle : hideDropdownStyle}>
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