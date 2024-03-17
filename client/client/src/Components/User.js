import React, { useState } from 'react'
import './Navigator.css'
import { NavLink, useLocation, useNavigate,Outlet } from 'react-router-dom';
function User() {
  
 
 
  return (
    <div>
      <Outlet style={{Height:"80vh"}}/>
    </div>
  )
}

export default User