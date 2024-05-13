import React, { useEffect, useState } from 'react';
import styles from '../../../styles/singledropdownfilter.module.css'
import { CaretDown, X } from '@phosphor-icons/react';

function SingleDropdownFilter({ filter, handleSingleDropdownFilter, handleRemoveFilter  }) {

    const [appliedFilter, setAppliedFilter] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)

    // useEffect(() => {
    //     handleSingleDropdownFilter(filter.uid, filter.name, appliedFilter)
    // }, [appliedFilter])

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    const handleDropdownClick = (option) => {
        setAppliedFilter(option)
        handleSingleDropdownFilter(filter.uid, filter.name, option)
        setShowDropdown(!showDropdown)
    }

    const removeFilter = (e) => {
        e.stopPropagation()
        handleRemoveFilter(filter.uid)
        setAppliedFilter(null)
    }


    const showAppliedFilter = () => {
        return (
            <div className={styles.appliedvalue}>
                <span>{appliedFilter}</span>
                <X size={14} className={styles.appliedvaluecross} onClick={(e) => removeFilter(e)}/> 
            </div>
        )
    }

    const toggleFilters = () => {
        setShowDropdown(!showDropdown)
    }
    
  return (
    <div className={styles.dropdown}>

            <div className={styles.dropdownsubcontainer} onClick={toggleFilters}>
                    <div className={styles.appliedFilters}>{appliedFilter == null ? filter.name : showAppliedFilter()}
                    </div>
                
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