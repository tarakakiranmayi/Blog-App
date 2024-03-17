import { createSlice } from "@reduxjs/toolkit";
//make hhtp request using redux thunk
import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from 'axios'
export const userAuthorThunk=createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
  try{
    if(userCredObj.userType==='user')
    {  
          const res=await axios.post('http://localhost:4000/user-api/login',userCredObj)
          if(res.data.message==='done'){
            //use session storage for high security and also once we closed storage is deleted
            //store in session storage and return data
            sessionStorage.setItem('Token',res.data.Token)
          }
          else{
            return thunkApi.rejectWithValue(res.data.message)
          }
        return res.data
        
          
    }
    if(userCredObj.userType==='author')
    { 
        const res=await axios.post('http://localhost:4000/author-api/authorLogin',userCredObj)
        if(res.data.message==='done'){
            sessionStorage.setItem('Token',res.data.Token)
        }
        else{
          return thunkApi.rejectWithValue(res.data.message)
        }
    
        return res.data
    }
    
  }
  catch(err)
  {
    return thunkApi.rejectWithValue(err)
  }
}

)

export const userAuthorSlice=createSlice({
    name:"user-author-login",
    initialState:{isPending:false,
    CurrentUser:{},
    errorMessage:{},
    LoginUserStatus:false,
    errorOccured:false
},
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false
            state.CurrentUser={}
            state.LoginUserStatus=false
            state.errorMessage={}
            state.errorOccured=false
        }
    },
    extraReducers:(builder)=>{builder
    .addCase(userAuthorThunk.pending,(state,action)=>{
       state.isPending=true
    })
    .addCase(userAuthorThunk.fulfilled,(state,action)=>{
        state.isPending=false
        state.CurrentUser=action.payload.user
        state.LoginUserStatus=true
        state.errorMessage=""
        state.errorOccured=false
    })
    .addCase(userAuthorThunk.rejected,(state,action)=>{
        state.isPending=false
            state.CurrentUser={}
            state.LoginUserStatus=false
            state.errorMessage=action.payload
            state.errorOccured=true
    })}
})
export const {resetState}=userAuthorSlice.actions

export default userAuthorSlice.reducer