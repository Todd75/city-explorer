import React from 'react';
import logo from '../logo2.jpg'


class Header extends React.Component {
  render() {
    return (
      <>
     <h1 id="mainHeader">City Explorer</h1>
     <div>
       <img src={logo} alt="logo"></img>
     </div>
     </>
    )
  }
}

export default Header;