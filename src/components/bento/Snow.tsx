import React from 'react'

const Snow: React.FC = () => {
  const snowflakes = Array.from({ length: 50 })
  return (
    <>
      {snowflakes.map((_, idx) => (
        <div key={idx} className="snow" />
      ))}
    </>
  )
}
export default Snow
