"use client";

import React from 'react';
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode;
}
const SessionProviderContext: React.FC<ProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default SessionProviderContext;
