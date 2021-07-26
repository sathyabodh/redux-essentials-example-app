import React, { useEffect, lazy } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from "react-redux"
import { postsSelector, fetchPosts, selectPostIds } from "./postsSlice"
import { PostExceprt } from './PostExcerpt'
import { useTranslation } from 'react-i18next'
// import { AddPost } from './AddPostForm'

const AddPost = lazy(()=> import('./AddPostForm'))

const PostsList = ()=>{
    const postIds = useSelector(selectPostIds)
    const postStatus = useSelector(state=> state.posts.status)
    const error = useSelector(state=> state.posts.error)
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation('posts')

    useEffect(()=>{
      if(postStatus === 'idle'){
        dispatch(fetchPosts())
      }
    }, [postStatus, dispatch])

    let content
    console.log(`status: ${postStatus}`)
    if(postStatus === 'loading'){
      content = <div>loading .....</div>
    }
    else if(postStatus === 'succeeded'){
      // const orderedPost = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
      // console.log(`size: ${posts.length}`)
      content = postIds.map(postId =>{
        let PostExcerpt = <PostExceprt key={postId} postId={postId}/>
        return PostExcerpt
      }) 
    }
    else if(postStatus === 'failed'){
      content = <div>{error}</div>
    }
    console.log(`content : ${content}`)
      return (
        <React.Fragment>
        <AddPost/>
        <section className="posts-list">
          <h2>{t('Posts')}</h2>
          {content}
        </section>
        </React.Fragment>
      )
}

export default PostsList