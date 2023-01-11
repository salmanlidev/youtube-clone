import Icons from "../../assets/icons"

export const PlaylistItem = ({ playlist }) => {

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

    return (
        <div className="border-b flex justify-between items-center cursor-pointer">
            <div className="flex flex-col gap-y-1">
                <h1 className="font-bold text-[0.9rem]" >{playlist.name}</h1>
                <span className="flex items-center text-[0.8rem]">{nFormatter(playlist.views)} <Icons.dot /> {playlist.years ? playlist.years : ""}</span>
            </div>
            {(playlist.duration).toFixed(2)}
        </div>
    )
}
