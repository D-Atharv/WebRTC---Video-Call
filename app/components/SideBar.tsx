import React from 'react';

type SideBarProps = {
    iconPaths: string[];
    micStatus: boolean;
    videoStatus: boolean;
    toggleMic: () => void;
    toggleVideo: () => void;
};

const SideBar: React.FC<SideBarProps> = React.memo(({ iconPaths, micStatus, videoStatus, toggleMic, toggleVideo }) => {
    const micIcon = micStatus ? iconPaths[0] : iconPaths[1];
    const videoIcon = videoStatus ? iconPaths[2] : iconPaths[3];


    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center h-96 justify-center xl:w-20 bg-gray-800 p-4 rounded-lg shadow-lg">
                <button onClick={toggleMic} className="mb-8">
                    <img src={micIcon} alt={micStatus ? "Mic On" : "Mic Off"} className="w-6 h-6" />
                </button>
                <button onClick={toggleVideo} className="mb-8">
                    <img src={videoIcon} alt={videoStatus ? "Video On" : "Video Off"} className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
});

export default SideBar;
