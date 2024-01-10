import React from 'react';

const ProfileInformations = () => {
    return (
        <div className="flex flex-shrink-0 items-center space-x-4 text-white">
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                <div className="flex flex-col items-end ">
                    <div className="text-md font-medium ">Unknow Unknow</div>
                    <div className="text-sm font-regular">Student</div>
                </div>

                <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
            </div>
        </div>
    );
};

export default ProfileInformations;
