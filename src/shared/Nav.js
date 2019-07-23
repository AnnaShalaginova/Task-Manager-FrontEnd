import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home </NavLink>
    <NavLink to='/tasks'>All tasks </NavLink>
    <NavLink to='/createtask'>Create New Task </NavLink>
  </nav>
)

export default Nav
