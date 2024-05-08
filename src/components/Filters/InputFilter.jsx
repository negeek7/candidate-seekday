import React from 'react'

function InputFilter({ filter }) {
  return (
    <div>
        <input type="text" placeholder={`Search ${filter.name}`} />
    </div>
  )
}

export default InputFilter