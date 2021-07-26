import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { selectPostById } from './postsSlice'

const ReactionButton = lazy(()=> import('./ReactionButton'))

const SinglePost = ({match})=>{
    const {postId} = match.params
    const post = useSelector(state=>selectPostById(state, postId))
    const history = useHistory()
    if(!post) {
        return (
            <div>
                No matching post found
            </div>
        )
    }
    const handleBackNavigation = ()=>{
        history.push("/posts")
    }
    return (
        <section>
            <h2>{post.title}</h2>
            <TimeAgo timeStamp={post.date}/>
            <p>{post.content}</p>
            <div>
                <PostAuthor authorId={post.user}/>
            </div>
            <ReactionButton post={post}/>
            <button onClick={handleBackNavigation}>Back</button>
        </section>
    )
}

export default SinglePost