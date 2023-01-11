import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getVideoDetail = createAsyncThunk("getVideoDetail", async (id) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/videos',
        params: { part: 'contentDetails,snippet,statistics', id: id },
        headers: {
            'X-RapidAPI-Key': '175b3735f0msh8f42daf878300b5p10f541jsn4a28152ec45e',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };

    
    const {data} = await axios.request(options)
    return await data
})

const initialState = {
    video: {},
    loading: false
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideoDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getVideoDetail.fulfilled, (state, action) => {
            state.loading = false
            state.video = action.payload.items[0]
        })
    }
})


export default videoSlice.reducer