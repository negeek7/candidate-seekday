import React, { useEffect, useState } from 'react';
import styles from '../../styles/SingleDropdownFilter.module.css'
import { CaretDown } from '@phosphor-icons/react';

function SingleDropdownFilter({ filter, handleSingleDropdownFilter  }) {

    const [appliedFilter, setAppliedFilter] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        handleSingleDropdownFilter(filter.uid, filter.name, appliedFilter)
    }, [appliedFilter])

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    const handleDropdownClick = (option) => {
        setAppliedFilter(option)
        setShowDropdown(!showDropdown)
    }


    const showAppliedFilter = () => {
        return (
            <>
                <span>{appliedFilter}</span>
            </>
        )
    }

    const toggleFilters = () => {
        setShowDropdown(!showDropdown)
    }
    
  return (
    <div className={styles.dropdown}>

            <div className={styles.dropdownsubcontainer} onClick={toggleFilters}>
                <span className={styles.appliedFilters}>{appliedFilter == null ? filter.name : showAppliedFilter()}
                </span>
                
                <CaretDown size={10} className={styles.downArrow}/>
            </div>

            <div id="myDropdown" className={styles.dropdownContent} style={showDropdown ? showDropDownStyle : hideDropdownStyle}>
                {
                    filter.options.map((option, index) => (
                        <span
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handleDropdownClick(option)}
                        >
                            {option}
                        </span>
                    ))
                }
            </div>

        </div>
  )
}

export default SingleDropdownFilter