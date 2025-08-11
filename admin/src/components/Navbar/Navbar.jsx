import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'


// this is Navbar part code  for snapzo Admin portal 
const Navbar = () => {
  return (
    <div className='navbar'>
            <img className="logo" src={assets.logo} title='Snapzo Admin Portal ' />
            <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar