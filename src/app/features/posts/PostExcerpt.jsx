import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
const ReactionButton = lazy(()=> import('./ReactionButton'))

export const PostExceprt = React.memo(({postId})=>{
    const post = useSelector(state=> selectPostById(state, postId))
    return (
        <article className="post-excerpt">
        <h2>{post.title}</h2>
        <p className="ost-content">{post.content.substring(0,100)}</p>
        <ReactionButton post={post}/>
        <Link to={`posts/${postId}`}>
            View Post
        </Link>
        <Link to={`editPost/${postId}`}>
            Edit Post
        </Link>
        </article>
    )
})