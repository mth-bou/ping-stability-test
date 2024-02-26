import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Main = ({ children }: LayoutProps) => {
    return (
        <main className="max-w-full h-full flex relative overflow-y-hidden">
            <div className="h-full w-full p-10 flex flex-wrap items-start justify-center rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
                {children}
            </div>
        </main>
    );
};

export default Main;
