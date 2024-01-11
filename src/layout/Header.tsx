import React from 'react';
import ProfileInformations from "@/components/Header/ProfileInformations";

const Header = () => {
    return (
        <header className="h-16 flex items-center relative justify-end px-5 space-x-10 dark:bg-background border-b">
            <h2 className="text-2xl font-bold mx-auto">Ping Stability Test</h2>
            <ProfileInformations />
        </header>
    );
};

export default Header;
