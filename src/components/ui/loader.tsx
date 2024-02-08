import React from 'react';
import {Loader2} from "lucide-react";
import {clsx} from "clsx";

const Loader = ({
    size,
    className
} : {
    size?: number,
    className?: string
}) => {
    return <Loader2 className={clsx("animate-spin", className)} size={size} />
};

export default Loader;
