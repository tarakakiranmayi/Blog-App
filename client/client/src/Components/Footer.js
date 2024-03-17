import React from 'react'

function Footer() {
  return (
    <div className='bg-black border footer'>
        <li style={{listStyleType:'none'}}>
         <ul>&copy;<span id="year"> </span><span> Your Company Name. All rights reserved.</span></ul>
        </li>
    </div>
  )
}

export default Footer