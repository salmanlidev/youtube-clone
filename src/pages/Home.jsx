import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import YoutubeLoader from '../components/loaders/YoutubeLoader'
import { VideoItem } from '../components/VideoItem'
import { getVideos } from '../store/features/videos/videosSlice'

const Home = ({setWatch }) => {
  const dispatch = useDispatch()
  const { videos  , loading , error } = useSelector(state => state.videos)

    
  useEffect(() => {
    setWatch(false)
    dispatch(getVideos())
  } , [])

  return (
    <div className='flex flex-1 flex-wrap gap-4 p-0 py-1 lg:px-5 overflow-x-hidden lg:py-4 mx-auto justify-center h-[calc(100vh-70px)] overflow-y-auto'>
        {error === 408 ? 
        <button onClick={() => window.location.reload()} className='self-center w-36 h-10 rounded-xl hover:bg-purple-900 hover:text-white duration-300 border border-purple-900 text-purple-900 px-3 py-1'>Yeniden Dene</button>
        : null}
        {loading && error === 0 ? <YoutubeLoader /> : videos.map(video => (
          <VideoItem key={video.id.videoId} video={video} />
        ))}
    </div>
  )
}

export default Home