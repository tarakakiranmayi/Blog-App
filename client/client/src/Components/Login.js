import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { userAuthorThunk } from '../Redux/slices/UserAuthorSlice';
import { UseSelector } from 'react-redux';
function Login() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    let [err,setErr]=useState('')
    let {LoginUserStatus,errorOccured,errorMessage,CurrentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let res
    let dispatch=useDispatch()
     async function handleFormSubmit(obj)
    {   console.log(obj)
            dispatch(userAuthorThunk(obj))
    }
    //writing useffect hook as asynchronously above action
    //it is executed when dependcy array is changed which is login status
    console.log(errorOccured,errorMessage,err)
    useEffect(()=>{
     if(errorOccured===true)
     {
        setErr(errorMessage)
     }
     else{
        setErr('')
     }
    },[errorOccured])
    useEffect(()=>{
        if(LoginUserStatus===true && CurrentUser.userType==='user' )
        {
            navigate(`/User/${CurrentUser.username}`)
        }
        if(LoginUserStatus===true && CurrentUser.userType==='author' )
        {
            navigate(`/Author/${CurrentUser.username}`)
        }
       
    },[LoginUserStatus])
  return (
    <div className='w-50 border-5 mx-auto border-dark shadow-lg my-5 p-3'>
       <h2 className='text-center m-2'>Login</h2>
       <form onSubmit={handleSubmit(handleFormSubmit)}>
       <div className='mb-3 row mx-3 form-check d-flex'>
    <div className=' col-lg-4'>
        <input
            type="radio"
            name="userType"
            value="user"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="user" className='form-label'>User</label>
    </div>
    <div className='col-lg-4'>
        <input
            type="radio"
            name="userType"
            value="author"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="author" className='form-label'>Author</label>
    </div>
    <div className='col-lg-4'>
        <input
            type="radio"
            name="userType"
            value="admin"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="admin" className='form-label'>Admin</label>
    </div>
</div>
{errors.userType && <p className='lead fs-4 text-danger'>Please select a user type</p>}

        <div className=''>
        <lable className="form-lable m-3" htmlFor="username">
        Username
        </lable>
        <input type="text" className='form-control m-3 w-75 ' id="username"
        {
            ...register("username",{required:true,minLength:3})
        } ></input>
        {
            errors.username?.type==='required' && <p className='lead fs-6 text-danger'>Invalid Username</p>   
        }
        {
            errors.username?.type==='minLength' && <p className='lead fs-6 text-danger'>minLenght is 3</p> 
        }
        </div>
       <div>
        <label className='form-label m-3' htmlFor='password'>Password</label>
        <input className='form-control m-3 w-75' type='password' id="password"
        {
            ...register("password",{required:true})
        }
       
        
        ></input>
         {
            errors.password?.type==='required' && <p className='lead fs-6 text-danger'>Password is required</p>
        }
       </div>
       <div className='text-center'>
        <button className='btn btn-success mx-auto' type='submit'>Submit</button>
       </div>
      
       </form>
       {
            err.length!=0 && <p>{err}</p>
        }
       <p className='lead fs-5 text-center'>
       
        <Link to="/Register" className='m-3'>New user
        </Link>
       </p>
       
    </div>
  )
}

export default Login