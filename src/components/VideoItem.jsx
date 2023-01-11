import moment from 'moment/moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import images from "../assets/images";


export const VideoItem = ({ video }) => {
  const navigate = useNavigate()

  const getVideo = () => {
      navigate(`/watch/${video?.id.videoId}`)
  }

  return (
    <div className='w-full lg:w-[19rem] flex flex-col items-center gap-2'>
      <LazyLoadImage onClick={getVideo} alt='videoPoster' src={video?.snippet?.thumbnails?.medium?.url} className="w-full lg:rounded-lg cursor-pointer hover:scale-110 duration-200" />
      <div className='flex flex-col w-full'>
        <h2 className='font-bold'>{(video?.snippet?.title).substring(0, 60)}...</h2>
        <h5 className='leading-6 text-sm font-medium'>Haber Global</h5>
        <h6 className='text-[0.9rem]'>4.4 mln görüntülenme - {moment(video?.snippet?.publishedAt).from()}</h6>
      </div>
    </div>
  )
}
