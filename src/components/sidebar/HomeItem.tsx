import React from 'react';
import {Home} from "lucide-react";
import {Link} from "@nextui-org/link";
import {Button} from "@/components/ui/button";

const HomeItem = () => {
    return (
        <Button
            variant="ghost"
            size="sm"
            asChild
        >
            <Link href="/">
                <Home />
            </Link>
        </Button>
    );
};

export default HomeItem;
