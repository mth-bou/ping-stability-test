"use client";

import React, {useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {Moon, SunMedium} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                setTheme( theme === 'light' ? 'dark' : 'light');
            }}
        >
            <SunMedium
                size={20}
                className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                color="#000000"
            />
            <Moon
                size={20}
                className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100"
            />
        </Button>
    );
};

export default ThemeToggle;
