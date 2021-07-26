import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from './features/posts/postsSlice'
import { userReducer } from './features/users/userSlice'
import { notificationReducer } from './features/notification/notificationSlice'

export default configureStore({
  reducer:  {
    posts: postReducer,
    users: userReducer,
    notifications: notificationReducer
  }
})
