import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home </NavLink>
    <NavLink to='/tasks'>All tasks </NavLink>
    <NavLink to='/create-movie'>Create New Task </NavLink>
    <NavLink to='/actors'>All actors </NavLink>
    <NavLink to='/create-actor'>Create New Actor</NavLink>
  </nav>
)

export default Nav
