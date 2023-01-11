import moment from "moment"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import images from "../../assets/images"
import { useWindowSize } from "../../helpers/useWindowSize"

export const ResultItem = ({ video  , videoId }) => {
    const windowSize = useWindowSize()

    

    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/watch/${videoId}`)} className="flex gap-x-2 w-full cursor-pointer group">
            <LazyLoadImage className="h-24 lg:h-full rounded-xl duration-300 group-hover:scale-95" src={video?.thumbnails?.medium?.url} />
            <div className="flex flex-col gap-0 lg:gap-y-3">
                <div className="flex flex-col gap-y-1">
                    <h1 className="font-bold text-[0.7rem] lg:text-[1rem]">{windowSize.width < 1024 ? (video?.title).substring(0 , 40) : video?.title}</h1>
                    <h5 className="text-[0.7rem] lg:text-[0.9rem]">{moment(video?.publishedAt).from()}</h5>
                </div>
                <div className="flex items-center gap-x-2">
                    <img alt="userIcon" src={images.userPng} className="h-6" />
                    <h6 className="text-[0.8rem] lg:text-[1rem]">{video?.channelTitle}</h6>
                </div>
                <p className="text-[0.9rem] hidden lg:inline-block">
                    {(video?.description).substring(0 , 70)}
                </p>
            </div>
        </div>
    )
}
