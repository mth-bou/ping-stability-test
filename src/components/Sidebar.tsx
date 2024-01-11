import React from "react";
import UserProfileItem from "@/components/Sidebar/UserProfileItem";
import UserProfileSettingsItem from "@/components/Sidebar/UserProfileSettingsItem";
import TestConnectionItem from "@/components/Sidebar/TestConnectionItem";

const Sidebar = () => {

    return (
        <aside className="h-full flex flex-col space-y-10 p-2 items-center justify-center relative text-white bg-background border-r">
            <UserProfileItem />
            <TestConnectionItem />
            <UserProfileSettingsItem />
        </aside>
    );
}

export default Sidebar;
