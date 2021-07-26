import React from 'react'
import { reactionAdded } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }

const ReactionButton = ({post})=> {
      const dispatch = useDispatch()
    
      const reactionAddedAction = (e)=>{
          console.log(`reaction clicked :${e.target.name}`)
          dispatch(reactionAdded({postId: post.id, reaction: e.target.name}))
      }
      return (
          <div>
              {
                  Object.entries(reactionEmoji).map(([name, emoji])=>(
                    <button name={name} key={name} onClick={()=> dispatch(reactionAdded({postId: post.id, reaction: name}))}>
                        {emoji}({post.reactions[name]})
                    </button>
                  ))
              }
          </div>
      )
  }

  export default ReactionButton