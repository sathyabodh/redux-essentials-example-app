import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from '../../../api/client'

const postEntityAdapter = createEntityAdapter({
    sortComparer: (a, b)=> b.date.localeCompare(a.data)
})

const reaction = {thumbsUp:0, hooray:0, heart:0, rocket:0, eyes:0}
export const initState = postEntityAdapter.getInitialState({
    status:'idle',
    error:null
})


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const savePost = createAsyncThunk('/posts/addNewPost', async(post)=>{
    const response = await client.post('fakeApi/posts', {post});
    return response.post
})


export const postSlice = createSlice({
    name: "posts",
    initialState: initState,
    reducers:{
            postAdded: { 
                reducer(state, action){
                    state.data.push(action.payload)
                },
                prepare(title, content, userId){
                    return {
                        payload:{
                            id: nanoid(),
                            title,
                            content,
                            user: userId,
                            reactions:reaction,
                            date: new Date().toISOString()
                        }
                    }
                }
                
            },
            reactionAdded: (state, action)=>{
                //let post = state.data.find(post=> post.id == action.payload.postId)
                let post = state.entities.[action.payload.postId]
                if(post){
                    post.reactions[action.payload.reaction] ++
                }
            },
            postUpdated: (state, action)=> {
                const post = state.entities[action.payload.id]
                if(post){
                    const {id, title, content, user} = action.payload
                    post.id = id
                    post.title = title
                    post.content = content
                    post.user = user
                } 
            }
    },
    extraReducers:{
        [fetchPosts.pending]: (state, action)=>{
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action)=>{
            state.status = 'succeeded'
            postEntityAdapter.upsertMany(state, action.payload)
            //state.data = state.data.concat(action.payload)
        },
        [fetchPosts.rejected]:(state, action)=>{
            state.status = 'failed'
            state.error = action.error.message
        },
        [savePost.fulfilled]: postEntityAdapter.addOne
    }
})

export const {postAdded, reactionAdded, postUpdated} = postSlice.actions

//export const postsSelector = (state) => state.posts.data

//export const selectPostById = (state, postId)=> state.posts.data.find(post=> post.id == postId)

export const postReducer = postSlice.reducer

export const {
    selectAll: postsSelector,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postEntityAdapter.getSelectors(state=> state.posts)

export const selectPostByUserId = createSelector(
    [postsSelector, (state, userId)=> userId], 
    (posts, userId)=> posts.filter(post=> post.user ===userId))