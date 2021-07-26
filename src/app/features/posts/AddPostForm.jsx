import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid, unwrapResult } from '@reduxjs/toolkit'
import { postAdded, savePost } from './postsSlice'
import { userSelector } from '../users/userSlice'
import { useTranslation } from 'react-i18next'

const AddPost = ()=>{
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
    const users = useSelector(userSelector)
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [t, i18n] = useTranslation(['posts'])

    const userOptions = users.map(user=> (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    async function addPost(e) {
        // e.preventDefault();

        console.log(`${title} ${content}`)
        try{
            setAddRequestStatus('pending')
            const response = await dispatch(savePost({title, content, userId}))
            console.log(`response from save :${response}`)
            unwrapResult(response)
            setTitle("")
            setContent("")   
            setUserId('')
        }catch(err){
            console.log(`error occured while saving ${err}`)
        }
        finally{
            setAddRequestStatus('idle')
        }
 
    }

    const onUserChange = (e)=> setUserId(e.target.value)
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && addRequestStatus == 'idle'

    return (
        <section>
            <h2>{t('AddPost.AddPost')}</h2>
            <div>
                <label>{t('AddPost.Title')}</label>
                <input 
                type="text" 
                placeholder="Enter title"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
                <label>{t('AddPost.Users')}</label>
                <select value={userId} onChange={onUserChange}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label>{t('AddPost.Content')}</label>
                <textarea
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                />

                <button onClick={addPost} disabled={!canSave}>{t('AddPost.SavePost')}</button>
            </div>
        </section>
    )
}

export default AddPost