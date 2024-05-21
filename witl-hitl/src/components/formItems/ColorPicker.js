'use strict'

import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

const ColorPicker = ({ bgColor, setBgColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color) => {
    setBgColor(color.hex)
  }

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleClick} 
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Pick Color
      </button>
      { displayColorPicker ? (
        <div className="absolute z-10">
          <div 
            className="fixed top-0 right-0 bottom-0 left-0" 
            onClick={handleClose}
          />
          <ChromePicker 
            color={bgColor} 
            onChange={handleChange} 
          />
          
        </div>
      ) : null }
    </div>
  )
}

export default ColorPicker
