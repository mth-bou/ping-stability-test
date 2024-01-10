"use client";

import React, {useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {Button} from "@nextui-org/button";
import {Moon, SunMedium} from "lucide-react";

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDarkMode = theme === "myDarkTheme";

    return (
        <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value={theme} />
            <SunMedium className="swap-on  w-6 h-6" />
            <Moon className="swap-off w-6 h-6" />
        </label>
    );
};

export default ThemeToggle;
