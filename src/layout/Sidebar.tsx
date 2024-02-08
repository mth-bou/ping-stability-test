import React from "react";
import UserProfileSettingsItem from "@/components/sidebar/UserProfileSettingsItem";
import TestConnectionItem from "@/components/sidebar/TestConnectionItem";
import HomeItem from "@/components/sidebar/HomeItem";

const Sidebar = () => {

    return (
        <aside className="h-full flex flex-col space-y-10 p-2 items-center justify-center relative text-white bg-primary-background border-r ">
            <HomeItem />
            <TestConnectionItem />
            <UserProfileSettingsItem />
        </aside>
    );
}

export default Sidebar;
