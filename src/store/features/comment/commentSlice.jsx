import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments : [] ,
    comLoading : false
}

export const getComment = createAsyncThunk("getComment" , async() => {
    const { data } = await axios.get("https://dummyjson.com/comments")
    return data
})

export const commentSlice = createSlice({
    name : "comment" ,
    initialState , 
    reducers : {} ,
    extraReducers : (builder) => {
        builder.addCase(getComment.pending , (state) => {
            state.comLoading = true
        })
        builder.addCase(getComment.fulfilled , (state , action) => {
            state.comLoading = false 
            state.comments = action.payload.comments
        })
    }
})


export default commentSlice.reducer