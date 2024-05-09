import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/InputFilter.module.css'

function InputFilter({ filter, handleTextFilter }) {

  const [filterValue, setFilterValue] = useState('')
  const [timeoutId, setTimeoutId] = useState(null);
  const [initialRender, setInitialRender] = useState(true)

  const handleInput = (e) => {
    setFilterValue(e.target.value)
  }

  const performSearch = () => {
    handleTextFilter(filter.uid, filter.name, filterValue)
  }

  useEffect(() => {
    if (!initialRender) {
      clearTimeout(timeoutId)
      setTimeoutId(setTimeout(() => {
        performSearch()
      }, 2000))
    } else {
      setInitialRender(false)
    }
  }, [filterValue])

  return (
    <div>
      <input
        type="text"
        placeholder={`Search ${filter.name}`}
        value={filterValue}
        onChange={handleInput}
        onInput={handleInput}
        className={styles.inputField}
      />
    </div>
  )
}

export default InputFilter