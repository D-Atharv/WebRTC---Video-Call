import ReactPlayer from 'react-player'

export const VideoPlayer = ({ playerId, url, muted, playing }: any) => {
    return (
        <div>
            <ReactPlayer
                key={playerId}
                url={url}
                playing={playing}
                muted={muted}
            />
        </div>
    )
}