const SideBar = ({ iconPaths }: { iconPaths: string[] }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center h-96 justify-center xl:w-20 bg-gray-800 p-4 rounded-lg shadow-lg">
                {iconPaths.map((path, index) => (
                    <div key={index}>
                        <img src={path} alt={`Icon ${index}`} className="w-6 h-6 my-8" />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SideBar;




