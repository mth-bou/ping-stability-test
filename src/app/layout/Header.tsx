import React from 'react';
import ProfileInformations from "@/app/components/Header/ProfileInformations";

const Header = () => {
    return (
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
            <h2 className="text-2xl font-bold mr-auto">Ping Stability Test</h2>
            <ProfileInformations />
        </header>
    );
};

export default Header;
