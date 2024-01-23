import React from 'react';
import ProfileInformations from "@/components/header/ProfileInformations";
import {Link} from "@nextui-org/link";
import {User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getAuthSession} from "@/lib/auth";
import ThemeToggle from "@/theme/ThemeToggle";

const Header = async () => {
    const session = await getAuthSession();

    return (
        <header className="h-16 flex items-center relative justify-end px-5 space-x-10 bg-primary-background border-b">
            <h2 className="text-2xl font-bold mx-auto">Ping Stability Test</h2>

            <ThemeToggle />
            
            {session?.user ?
                <ProfileInformations/>
                :
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <Link href="/auth/login">
                        <User/>
                    </Link>
                </Button>

            }
        </header>
    );
};

export default Header;
