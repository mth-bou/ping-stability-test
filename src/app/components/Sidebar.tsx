import React from "react";
import ThemeToggle from "@/app/theme/ThemeToggle";
import UserProfileItem from "@/app/components/Sidebar/UserProfileItem";
import UserProfileSettingsItem from "@/app/components/Sidebar/UserProfileSettingsItem";
import TestConnectionItem from "@/app/components/Sidebar/TestConnectionItem";

const Sidebar = () => {

    return (
        <aside className="h-full flex flex-col space-y-10 p-2 items-center justify-center relative text-white">
            <UserProfileItem />
            <TestConnectionItem />
            <UserProfileSettingsItem />
            <ThemeToggle />
        </aside>
    );
}

export default Sidebar;
