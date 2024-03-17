import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigator from './Navigator'
import Footer from './Footer'
function RootLayout() {
  return (
    <div>
        <Navigator/>
        <div style={{ minHeight: "85vh" , marginBottom :"3px"}}>
        <Outlet />
      </div>
        <Footer/>
    </div>
  )
}

export default RootLayout