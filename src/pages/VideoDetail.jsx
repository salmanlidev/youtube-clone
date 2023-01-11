import moment from "moment"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import YouTube from "react-youtube"
import Icons from "../assets/icons"
import images from "../assets/images"
import { CommentItem } from "../components/comment/CommentItem"
import YoutubeVideoLoader from "../components/loaders/YoutubeVideoLoader"
import { PlayList } from "../components/playList/PlayList"
import { getComment } from "../store/features/comment/commentSlice"
import { getPlaylist } from "../store/features/playlist/playlistSlice"
import { getVideoDetail } from "../store/features/video/videoSlice"
import { useWindowSize } from "../helpers/useWindowSize"


const VideoDetail = ({ setWatch }) => {
    const { id } = useParams()
    const { video, loading } = useSelector(state => state.video)
    const { playlist, playListLoading } = useSelector(state => state.playlist)
    const { comments, comLoading } = useSelector(state => state.comments)
    const [comment, setComment] = useState("")
    const [comBtn, setComBtn] = useState(false)
    const windowSize = useWindowSize()

    const dispatch = useDispatch()
    const [des, setDes] = useState(false)

    useEffect(() => {
        setWatch(true)
        dispatch(getVideoDetail(id))
        dispatch(getPlaylist())
        dispatch(getComment())
    }, [id])


    const nFormatter = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    
    const opts = {
        height: windowSize.width < 1024 ? windowSize.height - 400  : '740',
        width: windowSize.width < 1024 ? windowSize.width : '1340',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }


    return (
        <div className="flex flex-col lg:flex-row w-full py-5 lg:px-[3%] h-[calc(100vh-70px)] overflow-y-auto">
            {loading ? <YoutubeVideoLoader /> : <>
                <div className="flex-1 flex flex-col gap-y-2 ">
                    <YouTube videoId={id} opts={opts} />
                    <h1 className="text-lg lg:text-2xl self-start font-medium">{video?.snippet?.localized
                        ?.title}</h1>
                    <div className="flex flex-col gap-y-2 lg:gap-0 lg:flex-row items-center">
                        <div className="flex items-center gap-10 lg:gap-3">
                            <span className="p-3 lg:p-6 rounded-full bg-gray-300"></span>
                            <h2 className="font-bold">{video?.snippet?.channelTitle}</h2>
                            <button type="button" className="py-2 px-4 bg-black text-white font-bold rounded-full">Abone ol</button>
                        </div>
                        <div className="w-full lg:flex-1 flex gap-x-3 overflow-x-auto lg:justify-end">
                            <div className="flex py-2 px-2 bg-gray-200 rounded-full items-center">
                                <button type="button" className="flex items-center border-r border-gray-800 px-2 gap-x-2"><Icons.like className="text-xl" />{nFormatter(video?.statistics
                                    ?.likeCount)}</button>
                                <button type="button" className="text-xl flex items-center px-2"><Icons.dislike /></button>
                            </div>
                            <button type="button" className="video-btn"><Icons.share /> Paylaş</button>
                            <button type="button" className="video-btn"><Icons.save /> Kaydet</button>
                            <button type="button" className="video-btn"><Icons.horDot /></button>
                        </div>

                    </div>

                    <div onClick={() => setDes(!des)} className={`w-full rounded-lg bg-gray-300 flex flex-col p-4 gap-y-3`}>
                        <h3 className="text-sm font-bold">{nFormatter(video?.statistics
                            ?.viewCount)} views {moment(video?.snippet?.publishedAt).from()}</h3>
                        <pre className="whitespace-pre-wrap">
                            {des ? video?.snippet?.localized?.description : video?.snippet?.localized?.description.substring(0, 70)}
                        </pre>
                        <button onClick={() => setDes(!des)} type="button" className="font-bold text-black self-start">{des ? "Daha az göster" : "Daha çok göster"}</button>
                    </div>

                    <div className=" flex-col gap-8 hidden lg:flex">
                        <div className="flex items-center justify-between w-full lg:w-80">
                            <h2 className="font-bold"><span>4.469</span> Yorum</h2>
                            <div className="flex gap-x-1 font-semibold">
                                <button type="button" className="icon-style"><Icons.leftMenu /></button>
                                <h5>Sıralama ölçütü:</h5>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-4 focus-within:outline-none">
                            <img className="h-12" alt="commentUserPoster" src={images.userPng} />
                            <form onSubmit={(e) => e.preventDefault()} className="w-full gap-2 flex flex-col">
                                <input onClick={() => setComBtn(true)} value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="w-full border-b border-gray-600 focus-within:outline-none focus-within:border-gray-300" placeholder="Yorum ekleyin..." />
                                <div className={`flex items-center justify-between ${comBtn ? "" : "hidden"}`} >
                                    <button type="button" className="icon-style p-1 rounded-full hover:bg-blue-gray-100  duration-300"><Icons.smile /></button>
                                    <div className="flex items-center gap-x-4">
                                        <button className="px-3 py-1 hover:bg-gray-300 rounded-xl duration-300" type="button">Iptal</button>
                                        <button disabled={comment ? false : true} className="disabled:bg-gray-50 px-3 py-1 bg-gray-100 hover:bg-gray-300 rounded-xl duration-300" type="button">Yorum yap</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            {comLoading ? <p>Loading...</p> : comments.map((comment, index) => (
                                <CommentItem key={index} comment={comment} />
                            ))}
                        </div>

                    </div>
                </div>
                {/* Playlist Items */}
                <div className="w-full lg:w-3/12 flex flex-col items-center gap-y-4">
                    {playListLoading ? <p>Loading...</p> : playlist.map((video, index) => (
                        <PlayList key={index} video={video} />
                    ))}
                </div>
            </>}
        </div>
    )
}

export default VideoDetail