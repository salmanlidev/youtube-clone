import { useEffect } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import playlistData from "../assets/data/playlistData"
import icons from "../assets/icons"
import Icons from "../assets/icons"
import images from "../assets/images"
import { PlaylistItem } from "../components/playList/PlaylistItem"
import { ResultItem } from "../components/result/ResultItem"
import { getResult } from "../store/features/result/resultSlice"
import albumData from "../assets/data/albumData"


const SearchResult = ({ setWatch }) => {
    const { query } = useParams()
    const dispatch = useDispatch()
    const { results, loading, error } = useSelector(state => state.result)

    useEffect(() => {
        setWatch(false)
        if(query){
            dispatch(getResult(query))
        } 
    }, [query])

    return (
        <div className="px-5 py-2 flex-1 flex h-[calc(100vh-70px)] overflow-y-auto">
            <div className="flex-1 flex flex-col gap-y-2 p-0  lg:px-2">
                <button type="button" className="flex items-center font-bold gap-x-2 px-1" ><Icons.filter className="icon-style" /> Filtreler</button>
                <hr />
                <div className="flex flex-col gap-y-2 self-center">
                    {error === 408 ? <button onClick={() => window.location.reload()} className='self-center w-36 h-10 rounded-xl hover:bg-purple-900 hover:text-white duration-300 border border-purple-900 text-purple-900 px-3 py-1'>Yeniden Dene</button>
                        : null}
                    {loading && error === 0 ? <p>Loading...</p> : results.map((video, index) => (
                        <ResultItem key={index} video={video?.snippet} videoId={video?.id?.videoId} />
                    ))}
                </div>
            </div>
            <div className="w-2/6 mt-3 hidden lg:block">
                <div className="flex flex-col bg-gray-200 justify-center space-y-4 rounded-xl w-3/4 cursor-pointer">
                    <div className="flex items-center space-x-5 p-3">
                        <img className="rounded-full h-20" alt="playlistArtist" src={images.pl} />
                        <div className="flex flex-col space-y-1">
                            <h1 className="font-bold font-mono">GHOSTEMANE</h1>
                            <span className="flex items-center text-gray-600">@ghostemane {<icons.dot />} Müzik</span>
                            <button type="button" className="w-28 bg-black text-white py-1 rounded-full font-bold hover:opacity-75" >Abone ol</button>
                        </div>
                    </div>
                    <div className="flex relative">
                        <img alt="playlist1" src={images.pl} className="h-60 rounded-bl-xl" />
                        <div className="flex flex-col justify-between">
                            <img className="h-28" alt="playlist2" src={images.pl2} />
                            <img className="h-28 rounded-br-xl" alt="playlist3" src={images.pl3} />
                        </div>
                        <button type="button" className="font-bold text-[0.9rem] flex items-center gap-x-1 absolute bg-gray-50 rounded-full px-3 py-2 bottom-3 left-3 hover:bg-gray-400" ><icons.play /> Youtube Mix'i</button>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 mt-3 w-3/4">
                    {playlistData.map((playlist, index) => (
                        <PlaylistItem playlist={playlist} />
                    ))}
                </div>

                <div className="w-3/4 mt-3 flex flex-col gap-3">
                    <h1 className="font-bold text-xl">Albümler</h1>
                    <div className="flex gap-3">
                        {albumData.map((album, index) => (
                            <div key={index} className="flex flex-col bg-gray-300 rounded-xl items-center gap-2 pb-2 cursor-pointer" >
                                <LazyLoadImage className="h-26 rounded-t-xl" alt="albumPoster" src={album.url} />
                                <h5>{album.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchResult