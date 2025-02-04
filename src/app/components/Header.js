import React from 'react'

const Header = (props) => {
  return (
    <div className="header-bg">
        <div className="container">
            <h2 className="main-title">{props.heading}</h2>
        </div>
    </div>
  )
}

export default Header