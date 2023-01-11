import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    results: [],
    loading: false,
    error: 0
}

export const getResult = createAsyncThunk("getResult", async (query) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
            q: query,
            part: 'snippet,id',
            maxResults: "100"
        },
        headers: {
            'X-RapidAPI-Key': '175b3735f0msh8f42daf878300b5p10f541jsn4a28152ec45e',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    }
    try {
        const { data } = await axios.request(options)
        return await data
    }
    catch (e) {
        throw e
    }

})

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResult.pending, (state) => {
            state.error = 0
            state.loading = true
            
        })
        builder.addCase(getResult.fulfilled, (state, action) => {
            state.error = 0
            state.loading = false
            state.results = action.payload.items
        })
        builder.addCase(getResult.rejected , (state, action) => {
            state.error  = 408
        })
    }
})


export default resultSlice.reducer