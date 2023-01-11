import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    playlist: [],
    playListLoading: false
}

export const getPlaylist = createAsyncThunk("getPlaylist", async () => {
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/playlistItems',
        params: { playlistId: 'RDZiQo7nAkQHU', part: 'snippet', maxResults: '50' },
        headers: {
            'X-RapidAPI-Key': '175b3735f0msh8f42daf878300b5p10f541jsn4a28152ec45e',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    }

    const { data } = await axios.request(options)
    return data
})

export const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlaylist.pending , (state) => {
            state.playListLoading = true
        })
        builder.addCase(getPlaylist.fulfilled , (state , action) => {
            state.playListLoading = false 
            state.playlist = action.payload.items
        })
    }
})


export default playlistSlice.reducer