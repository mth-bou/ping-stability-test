import React from 'react';
import {BarChart3} from "lucide-react";
import {Link} from "@nextui-org/link";
import {Button} from "@/components/ui/button";

const TestConnectionItem = () => {
    return (
        <Button
            variant="ghost"
            size="sm"
            asChild
        >
            <Link href="/test-connection">
                <BarChart3 />
            </Link>

        </Button>
    );
};

export default TestConnectionItem;
