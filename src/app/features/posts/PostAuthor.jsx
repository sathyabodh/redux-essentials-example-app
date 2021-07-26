import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({authorId})=>{
    const postAuthor = useSelector(state=> state.users.find(user=> user.id == authorId))
    if(!postAuthor){
        return <span>Unknown User</span>
    }
    return <span>{postAuthor.name}</span>
}