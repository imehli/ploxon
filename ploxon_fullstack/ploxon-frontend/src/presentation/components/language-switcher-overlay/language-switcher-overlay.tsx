import React, { useState } from 'react'

const Example: React.FC = () => {
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = (): void => {
    setVisibility(!isVisible)
  }

  return (
    <>
      <div style={{ background: 'red', height: '200px', width: '200px' }}>
        <button onClick={toggleVisibility}>Toggle Overlay</button>
      </div>
      {isVisible && (
        <div style={{ position: 'absolute', top: 0, left: 0, background: 'blue', height: '100%', width: '100%' }}>
          Overlay
        </div>
      )}
    </>
  )
}

export default Example
