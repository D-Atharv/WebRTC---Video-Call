import ReactPlayer from 'react-player'

export const VideoPlayer = ({ url, muted, playing }: any) => {
    return (
        <div>
            <ReactPlayer
                url={url}
                playing={playing}
                muted={muted}
            />
        </div>
    )
}