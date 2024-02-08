import React from 'react';
import {Link} from "@nextui-org/link";
import {UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";

const UserProfileItem = () => {
    return (
        <Button
            variant="ghost"
            size="sm"
            asChild
        >
            <Link href="/profile">
                <UserRound />
            </Link>
        </Button>
    );
};

export default UserProfileItem;
