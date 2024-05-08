import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Filters.module.css'

function Filters() {

    const [showDropdwon, setShowDropdown] = useState(false)
    const filterData = useSelector(state => state.app.filterData)


    console.log(filterData, "filterData")

    const hideDropdownStyle = {
        display: "none"
    }

    const showDropDownStyle = {
        display: "block"
    }

    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'dropdown':
                return (
                    <div class={styles.dropdown}>
                        <button onClick={() => setShowDropdown(!showDropdwon)} className="dropbtn">
                            {filter.name}
                        </button>
                        <div id="myDropdown" class={styles.dropdownContent} style={showDropdwon ? showDropDownStyle : hideDropdownStyle}>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
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