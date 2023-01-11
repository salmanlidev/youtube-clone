import moment from "moment"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"

export const PlayList = ({ video }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/watch/${video?.snippet?.resourceId?.videoId}`)} className="lg:ml-8 flex w-full items-center gap-x-2 cursor-pointer group">
            <LazyLoadImage className="h-24 rounded-lg duration-300 group-hover:scale-105" alt="poster" src={video?.snippet?.thumbnails?.medium?.url} />
            <div className="flex flex-col justify-between ">
                <h1 className="font-bold text-sm">{(video?.snippet?.title).substring(0, 60)}</h1>
                <h3 className="text-[0.9rem]">{video?.snippet?.videoOwnerChannelTitle}</h3>
                <h4 className="text-[0.9rem]">2mn - {moment(video?.snippet?.publishedAt).from()}</h4>
            </div>
        </div>
    )
}
