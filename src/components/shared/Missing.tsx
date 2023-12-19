import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div>
      <h1>The Path Does Not Exist.</h1>
      <Link to="/">Home Page</Link>
    </div>
  )
}
export default Missing
