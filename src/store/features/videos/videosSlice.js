import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    videos: [],
    loading: false ,
    error : 0
}

export const getVideos = createAsyncThunk("getVideos", async () => {
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
            relatedToVideoId: '7ghhRHRP6t4',
            part: 'id,snippet',
            type: 'video',
            maxResults: '50'
        },
        headers: {
            'X-RapidAPI-Key': '175b3735f0msh8f42daf878300b5p10f541jsn4a28152ec45e',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };
    try {
        const { data } = await axios.request(options)
        return await data
    }
    catch (e) {
        if(!e.response){
            throw e
        }
       
    }
})

export const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideos.pending, (state) => {
            state.error = 0 
            state.loading = true
        })
        builder.addCase(getVideos.fulfilled, (state, action) => {
            state.videos = action.payload.items
            state.loading = false
            state.error = 0
        })
        builder.addCase(getVideos.rejected , (state,action) => {
            state.error = 408
        })
    }
})


export default videosSlice.reducer