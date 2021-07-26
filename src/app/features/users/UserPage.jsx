import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostByUserId } from '../posts/postsSlice'
import { useTranslation } from 'react-i18next'

export const UserPage = ({match})=>{
    const {userId} = match.params
    const user = useSelector(state=> state.users.find(user=> user.id === userId))
    const userPosts = useSelector(state=> selectPostByUserId(state, userId))
    //useSelector(state=> state.posts.data.filter(post=> post.user == userId))
    const {t, i18n} = useTranslation()
    
    return(
        <section>
            <h2>{user.name}</h2>
            <h3>{t('PostWithCount', {count: userPosts.length})}</h3>
            <ul>
                {
                    userPosts.map(post=>(
                        <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                        
                    ))
                }
            </ul>
        </section>
    )

}