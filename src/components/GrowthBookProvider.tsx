"use client";

import { useEffect, useState } from "react";

import {
    GrowthBookProvider as GBProvider,
} from "@growthbook/growthbook-react";

import { growthbook } from "@/lib/client";

import { getAnonymousId } from "@/lib/anonymous-id";

export default function GrowthBookProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [initialized, setInitialized] =
        useState(false);

    useEffect(() => {
        let mounted = true;

        async function initializeGrowthBook() {
            try {
                // 1. Get persistent anonymous ID
                const anonymousId =
                    getAnonymousId();

                console.log(
                    "GrowthBook Anonymous ID:",
                    anonymousId
                );

                // 2. Set user attributes BEFORE init
                growthbook.setAttributes({
                    id: anonymousId,
                });

                // 3. Initialize GrowthBook
                await growthbook.init();

                if (mounted) {
                    setInitialized(true);
                }
            } catch (error) {
                console.error(
                    "GrowthBook initialization failed:",
                    error
                );

                if (mounted) {
                    setInitialized(true);
                }
            }
        }

        initializeGrowthBook();

        return () => {
            mounted = false;
        };
    }, []);

    if (!initialized) {
        return null;
    }

    return (
        <GBProvider growthbook={growthbook}>
            {children}
        </GBProvider>
    );
}