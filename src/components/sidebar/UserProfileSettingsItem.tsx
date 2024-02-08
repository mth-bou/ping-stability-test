import React from 'react';
import {Link} from "@nextui-org/link";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";

const UserProfileSettingsItem = () => {
    return (
        <Button
            variant="ghost"
            size="sm"
            asChild
        >
            <Link href="/profile/settings">
                <Settings />
            </Link>
        </Button>
    );
};

export default UserProfileSettingsItem;
