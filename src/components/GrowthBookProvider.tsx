"use client";

import { useEffect } from "react";
import { GrowthBookProvider as GBProvider } from "@growthbook/growthbook-react";
// 1. Import your single source of truth!
import { growthbook } from "@/lib/client"; 

export default function GrowthBookProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // 2. Initialize the shared client
        growthbook.init();
    }, []);

    return (
        // 3. Pass the shared client to the React tree
        <GBProvider growthbook={growthbook}>
            {children}
        </GBProvider>
    );
}