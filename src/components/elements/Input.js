import React from 'react'

const TextField = ({label, value, onChange ,type, placeholder,multiple, checked,...rest}) => {
  return (
    <div>
        <label>{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} multiple={multiple} checked={checked} {...rest}/>
    </div>
  )
}

export default TextField