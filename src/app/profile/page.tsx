import React from 'react';
import { getAuthSession } from "@/lib/auth";

const Profile = async () => {
    const session = await getAuthSession();

    if (session?.user) {
        return (
            <div>
                <h2>Profile page of {session?.user?.name}</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>You must be logged in to access this page.</h2>
        </div>
    );
};

export default Profile;
