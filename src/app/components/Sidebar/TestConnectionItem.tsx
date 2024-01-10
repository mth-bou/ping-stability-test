import React from 'react';
import {BarChart3} from "lucide-react";
import {Link} from "@nextui-org/link";

const TestConnectionItem = () => {
    return (
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <Link href="/test-connection">
                <BarChart3 />
            </Link>
        </div>
    );
};

export default TestConnectionItem;
