import React from 'react';
import { Navbar, Nav  } from 'react-bootstrap';
import {NavLink} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import { resetState } from '../Redux/slices/UserAuthorSlice';

const Navigator = () => {
  let {LoginUserStatus,CurrentUser}=useSelector(state=>state.userAuthorLoginReducer)
  let dispatch = useDispatch();
  
  function signout(){
    console.log(CurrentUser)
    sessionStorage.removeItem('Token')
    dispatch(resetState())
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand to="home">Your Logo or Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto " style={{display:"flex",justifyContent:"space-between"}}>
        {
          LoginUserStatus===true ?(
            <>
            <h1 className='text-white'>welcome</h1>
          
           <p className='text-white'>{CurrentUser.username}</p>
           <NavLink to="Login" className='mx-2' onClick={signout}>SignOut</NavLink>
            </>
          ):(
            <>
            <div className='d-flex justify-content-end' style={{justifyContent:"end",display:"flex"}}>
            <NavLink to="" className='m-2'>Home</NavLink>
           <NavLink to="Register" className='m-2'>SignUp</NavLink>
           <NavLink to="Login" className='m-2'>SignIn</NavLink></div>
            </>
          )
        }
         
        
          {/* Add more NavLink components for other sections */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
