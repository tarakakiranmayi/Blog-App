import React, { useState } from 'react'
import './Navigator.css'
import { NavLink, useLocation, useNavigate,Outlet } from 'react-router-dom';
function UserDashed() {
  const { state } = useLocation();
 
 
  return (
    <div>
     
      <div className='container'>
          <div className='row'>
            <div className='col col-lg-6'>
              <div className='card'>
                <div className='card-image'>
                <img src="https://www.bloopanimation.com/wp-content/uploads/2017/04/about_icons_articles.png" alt="" width='100%' height='300px'/>
                </div>
                <div className='card-footer'><NavLink className='success d-block mx-auto' to="AuthorAddarticle"  ><h4>ADD NEW ARTICLE</h4></NavLink></div>
              </div>
            </div>
            <div className='col col-lg-6'>
            <div className='card'>
                <div className='card-image'>
                  <img src="https://media.istockphoto.com/id/1362788582/vector/weekly-or-daily-newspaper-with-articles-news-sheet-with-picture-and-text-folded-tabloid.jpg?s=612x612&w=0&k=20&c=3MVK1xgX7igZ3gBJoBZUz1PRGWptRIrYsdhlr4K2Qgo=" alt="" width='100%' height='300px'/>
                </div>
                <div className='card-footer'> <NavLink className=' d-block mx-auto'to="" > <h4> ARTICLEs</h4></NavLink></div>
              </div>
            </div>
             </div>
      </div>
      <Outlet style={{Height:"80vh"}}/>
    </div>
  )
}

export default UserDashed