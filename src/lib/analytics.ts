// lib/analytics.ts

export const analytics = {
    track: async (
        event: string,
        properties: Record<
            string,
            unknown
        > = {}
    ) => {
        try {
            await fetch(
                "/api/analytics",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        event,
                        ...properties,
                    }),
                }
            );
        } catch (error) {
            console.error(
                "Analytics tracking failed:",
                error
            );
        }
    },
};