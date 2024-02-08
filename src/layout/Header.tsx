import React from 'react';
import ProfileInformations from "@/components/header/ProfileInformations";
import {Link} from "@nextui-org/link";
import {User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getAuthSession} from "@/lib/auth";
import ThemeToggle from "@/theme/ThemeToggle";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import LogOutButton from "@/components/auth/logoutButton";
import ProfileButton from "@/components/auth/profileButton";

const Header = async () => {
    const session = await getAuthSession();

    return (
        <header className="h-16 flex items-center relative justify-end px-5 space-x-2 bg-primary-background border-b">
            <h2 className="text-2xl font-bold mx-auto">Ping Stability Test</h2>

            <ThemeToggle />

            {session?.user ?
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ProfileInformations />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <ProfileButton />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                :
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <Link href="/auth/signin">
                        <User/>
                    </Link>
                </Button>

            }
        </header>
    );
};

export default Header;
