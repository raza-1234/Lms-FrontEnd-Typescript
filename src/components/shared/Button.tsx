import React from 'react'

type ParentProps = {
  value: string,
  clickFunction: () => void
} 
const Button = ({value, clickFunction}: ParentProps) => {
  return (
    <button 
      onClick = {clickFunction}
      className='customButton' 
      type='button'
    >
      {value}
    </button>
  )
}

export default Button;
