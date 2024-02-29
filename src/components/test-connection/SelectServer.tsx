"use client";

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { gameServers } from "@/constants/gameServers";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface SelectServerProps {
    setHost: (host: string) => void;
    style?: React.CSSProperties;
}

const SelectServer: React.FC<SelectServerProps> = ({ setHost, style }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    style={style}
                >
                    <Avatar className="mr-4">
                        <AvatarImage src={gameServers.find((gameServer) => gameServer.value === value)?.icon} alt={value} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    {value
                        ? gameServers.find((gameServer) => gameServer.value === value)?.label
                        : "Selectionner un serveur de jeu..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Chercher un jeu..." className="h-9" />
                    <CommandEmpty>Aucun jeu trouvé</CommandEmpty>
                    <CommandGroup>
                        {gameServers.map((gameServer) => (
                            <CommandItem
                                key={gameServer.value}
                                value={gameServer.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setHost(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Avatar className="mr-4">
                                    <AvatarImage src={gameServer.icon} alt={gameServer.label} />
                                    <AvatarFallback>{gameServer.label[0]}</AvatarFallback>
                                </Avatar>
                                {gameServer.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === gameServer.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectServer;
