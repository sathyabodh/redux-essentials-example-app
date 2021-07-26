import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async()=>{
    const response = await client.get('/fakeApi/users')
    return response.users
})

export const userSlice = createSlice({
    name: "users",
    initialState:[
    ],
    reducers:{

    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action)=>{
           return action.payload
        }
    }
})

export const userSelector = (state)=> state.users

export const userReducer = userSlice.reducer