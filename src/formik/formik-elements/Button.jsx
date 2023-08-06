import React from 'react'

const Button = (props) => {
    const { label ,disabled} = props;
  return (
    <button type="submit"  className={`btn__submit ${disabled && "pointer-events-none"}`} disabled={disabled}>
    {label}
  </button>
  )
}

export default Button