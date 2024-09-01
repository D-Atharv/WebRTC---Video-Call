import ReactPlayer from 'react-player';

export const VideoPlayer = ({ url, muted, playing }: any) => {
    return (
        <div className="relative w-full aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-16 lg:aspect-h-8  ">
            <ReactPlayer
                url={url}
                playing={playing}
                muted={muted}
                className="absolute top-0 left-0 w-full h-full scale-x-[-1]"
                width="100%"
                height="100%"
            />
        </div>
    );
};
