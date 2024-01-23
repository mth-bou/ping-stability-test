"use client";

import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return (
        <NextUIProvider>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
};

export default ThemeProvider;

