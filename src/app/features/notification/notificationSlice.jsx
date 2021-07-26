import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import { setDate } from "date-fns";

export const fetchNotification = createAsyncThunk('notification/fetch', async(_, {getState})=>{
    
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimeStamp = latestNotification ? latestNotification.date:''
    const response = await client.get(`/fakeApi/notifications?since=${latestTimeStamp}`)
    return response.notifications
})

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState:[],
    reducers:{
        allNotificationRead: (state, action)=>{
            state.forEach(notification=> notification.read = true)
        }
    },
    extraReducers:{
        [fetchNotification.fulfilled]: (state, action)=>{
            state.forEach(notification=> notification.isNew = !notification.read)
            state.push(...action.payload)
            console.log(`length in ${state.length}`)
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
})

export const selectAllNotifications = (state)=> state.notifications
export const { allNotificationRead } = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer
