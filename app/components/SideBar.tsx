import React from 'react';

type SideBarProps = {
    iconPaths: string[];
    micStatus: boolean;
    toggleMic: () => void;
};

const SideBar: React.FC<SideBarProps> = ({ iconPaths, micStatus, toggleMic }) => {
    const micIcon = micStatus ? iconPaths[0] : iconPaths[1];
    const videoIcon = iconPaths[2];
    const videoOffIcon = iconPaths[3];

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center h-96 justify-center xl:w-20 bg-gray-800 p-4 rounded-lg shadow-lg">
                <button onClick={toggleMic} className="mb-8">
                    <img src={micIcon} alt={micStatus ? "Mic On" : "Mic Off"} className="w-6 h-6" />
                </button>
                <img src={videoIcon} alt="Video On" className="w-6 h-6 mb-8" />
                <img src={videoOffIcon} alt="Video Off" className="w-6 h-6" />
            </div>
        </div>
    );
};

export default SideBar;

