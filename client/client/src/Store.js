import {configureStore} from '@reduxjs/toolkit'
import  userAuthorSlice  from './Redux/slices/UserAuthorSlice'
export const store=configureStore({
    reducer:{
        userAuthorLoginReducer:userAuthorSlice
    }
})