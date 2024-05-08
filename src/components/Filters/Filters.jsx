import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Filters.module.css'
import { handleFilterSelection } from '../../redux/actions/AppActions';
import { X } from '@phosphor-icons/react';

function Filters() {


    const dispatch = useDispatch()
    const [showDropdwon, setShowDropdown] = useState(false)
    const [filterValues, setFilterValues] = useState([])
    const filterData = useSelector(state => state.app.filterData)

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    const handleRoleDropdownClick = (name, option) => {
        console.log(name, option, "name, option")
        if(filterValues.includes(option)) return;
        setFilterValues(prevFilterValues => [...prevFilterValues, ...[option]])
        // dispatch(handleFilterSelection(name, option))
    }

    console.log(filterValues, "ROLE FILTER VALUE")

    const showAppliedFilterValues = () => {
        return (
            filterValues.map(value => (
                <div className={styles.roleFilterValueContainer}>
                    <span>{value}</span>
                    <span><X sixe={14}/></span>
                </div>
            ))
        )
        
    }

    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'dropdown':
                return (
                    <div class={styles.dropdown}>
                        <button onClick={() => setShowDropdown(!showDropdwon)} className="dropbtn">
                            {!filterValues.length ? filter.name: showAppliedFilterValues() }
                        </button>
                        <div id="myDropdown" class={styles.dropdownContent} style={showDropdwon ? showDropDownStyle : hideDropdownStyle}>
                            {
                                filter.options.map((option, index) => (
                                    <span
                                        key={index}
                                        className={styles.dropdownOption}
                                        onClick={() => handleRoleDropdownClick(filter.name, option)}
                                    >
                                            {option}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
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