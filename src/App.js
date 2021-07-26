import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
//import { PostsList } from './app/features/posts/PostsList'
// import { AddPost } from './app/features/posts/AddPostForm'
// import EditPost from './app/features/posts/EditPostForm'
//import { UserList } from './app/features/users/UserList'
import { UserPage } from './app/features/users/UserPage'
import { NotificationList } from './app/features/notification/NotificationList'

const UserList = lazy(()=> import('./app/features/users/UserList'))
const PostsList = lazy(()=> import('./app/features/posts/PostsList'))
const SinglePost = lazy(()=> import('./app/features/posts/SinglePost'))
const EditPost = lazy(()=> import('./app/features/posts/EditPostForm'))

function App() {
  return (
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div className="App">

        <Switch>
 
          <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  
                  <PostsList/>
                </React.Fragment>
              )}
            />


          <Route
            exact
            path="/posts/:postId"
            component={SinglePost}
          />
          <Route
            exact
            path="/editPost/:postId"
            component={EditPost}
          />

            <Route
              exact
              path='/users'
              component={UserList}
            />
\          <Route
            exact
            path='/users/:userId'
            component={UserPage}
          />
          <Route
            exact
            path="/notifications"
            component={NotificationList}
          />
          <Redirect to="/" />
        </Switch>
        
      </div>
      </Suspense>
    </Router>
  )
}

export default App
