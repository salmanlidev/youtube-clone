import Icons from "../../assets/icons"
import images from "../../assets/images"

export const CommentItem = ({ comment }) => {
    return (
        <div className="flex gap-x-4 items-start w-1/2">
            <div className="h-full">
                <img className="h-10" alt="commentUser" src={images.userPng} />
            </div>
            <div className="flex flex-col gap-y-1">
                <h1 className="font-bold text-[1rem]">{comment?.user?.username}</h1>
                <p>{comment?.body}</p>
                <div className="flex items-center gap-x-2">
                    <button type="button" className="flex items-center gap-x-1"><Icons.like className="icon-style"/> 65 </button>
                    <button type="button"><Icons.dislike className="icon-style"/></button>
                    <button type="button">Yanıtla</button>
                </div>
            </div>
        </div>
    )
}
