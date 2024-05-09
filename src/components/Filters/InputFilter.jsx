import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/InputFilter.module.css'

function InputFilter({ filter, handleTextFilter }) {

  const [filterValue, setFilterValue] = useState('')
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInput = (e) => {
    setFilterValue(e.target.value)
  }

  const performSearch = () => {
    handleTextFilter(filter.uid, filter.name, filterValue)
  }

  useEffect(() => {
    clearTimeout(timeoutId)
    if(filterValue){
      setTimeoutId(setTimeout(() => {
        performSearch()
      }, 2000))
    }
  }, [filterValue])

  return (
    <div>
      <input
        type="text"
        placeholder={`Search ${filter.name}`}
        value={filterValue}
        onChange={handleInput}
        className={styles.inputField}
      />
    </div>
  )
}

export default InputFilter