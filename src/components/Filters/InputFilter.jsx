import React from 'react';
import styles from '../../styles/InputFilter.module.css'

function InputFilter({ filter }) {
  return (
    <div>
        <input 
            type="text" 
            placeholder={`Search ${filter.name}`} 
            className={styles.inputField}
        />
    </div>
  )
}

export default InputFilter