import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postUpdated, selectPostById } from './postsSlice'
import { useHistory } from 'react-router-dom'
import { userSelector } from '../users/userSlice'
import { useTranslation } from 'react-i18next'

const EditPost = ({match})=>{
    const {postId} = match.params
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state=> selectPostById(state, postId))
    const users = useSelector(userSelector)
    const user = useSelector(state=> state.users.find(user=> user.id == post.user))

    const [title, setTitle] = useState(post?.title ||"")
    const [content, setContent] = useState(post?.content || "")
    const [userId, setUserId] = useState(post?.user || "")

    const {t, i18n} = useTranslation(['posts'])

    console.log(`content : ${post.content} ${content}`)
    if(!post){
        return(
            <div>
                No matching post found
            </div>
        )
    }

    const userOptions = users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>        
    ))

    const onSavePost = ()=>{
        if(title && content){
            dispatch(postUpdated({
                id: post.id,
                title,
                content,
                user: userId
            }))
        }
        history.push(`/posts/${post.id}`)
    }
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    return(
        <form onSubmit={onSavePost}>
            <div>
                <span>{t('EditPost.LastModified', {date: new Date()})}</span>
            </div>
            <h2>Edit Post</h2>
            <label htmlFor="title">{t('AddPost.Title')}</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={e=> setTitle(e.target.value)}
            />
            <label htmlFor="postAuthor">User</label>
            <select value={userId} onChange={e=> setUserId(e.target.value)}>
                <option value=""></option>
                {userOptions}
            </select>
            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e)=> setContent(e.target.value)}
            />
            <input type="submit" disabled={!canSave} value="Save Post"/>
        </form>
    )
}

export default EditPost