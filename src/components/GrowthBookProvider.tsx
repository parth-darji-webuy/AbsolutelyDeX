"use client";

import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider as GBProvider } from "@growthbook/growthbook-react";

const growthbook = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,

    enableDevMode: true,
});

export default function GrowthBookProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        growthbook.init();
    }, []);

    return (
        <GBProvider growthbook={growthbook}>
            {children}
        </GBProvider>
    );
}