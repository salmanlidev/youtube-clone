import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./features/videos/videosSlice";
import videoReducer from "./features/video/videoSlice";
import playlistReducer from "./features/playlist/playlistSlice";
import commentReducer from "./features/comment/commentSlice";
import resultReducer from "./features/result/resultSlice";

export const store = configureStore({
    reducer : {
        videos : videosReducer ,
        video : videoReducer ,
        playlist : playlistReducer , 
        comments : commentReducer , 
        result : resultReducer
    }
})