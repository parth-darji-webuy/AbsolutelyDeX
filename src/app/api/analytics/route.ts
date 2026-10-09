import { prisma } from "@/lib/prisma";

const TRACKED_EVENTS = [
    "add_to_cart",
    "quick_view_clicked",
    "theme_toggle",
    "whats_new_clicked",
];

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log("Analytics payload:", body);

        const {
            event,

            // ---------------------------------------
            // Common
            // ---------------------------------------
            anonymousId,
            customerId,

            // ---------------------------------------
            // Experiment fields
            // ---------------------------------------
            experimentKey,
            experimentName,
            variationId,
            variationName,
            variationValue,
            featureId,

            // ---------------------------------------
            // Feature fields
            // ---------------------------------------
            featureKey,
            featureEnabled,

            // ---------------------------------------
            // Product fields
            // ---------------------------------------
            product_id,
            product_name,

            // ---------------------------------------
            // Add to Cart fields
            // ---------------------------------------
            slug,
            brand,
            price,
            quantity,
            selected_size,
            selected_color,

            // ---------------------------------------
            // Theme Toggle fields
            // ---------------------------------------
            theme,

            // ---------------------------------------
            // What's New fields
            // ---------------------------------------
            source,
        } = body;

        // ---------------------------------------
        // Validate common fields
        // ---------------------------------------

        if (!event) {
            return Response.json(
                {
                    success: false,
                    error: "event is required",
                },
                { status: 400 }
            );
        }

        if (!anonymousId) {
            return Response.json(
                {
                    success: false,
                    error: "anonymousId is required",
                },
                { status: 400 }
            );
        }

        // =======================================
        // EXPERIMENT EXPOSURE
        // =======================================

        if (event === "experiment_exposure") {
            if (!experimentKey) {
                return Response.json(
                    {
                        success: false,
                        error: "experimentKey is required",
                    },
                    { status: 400 }
                );
            }

            if (
                variationId === undefined ||
                variationId === null
            ) {
                return Response.json(
                    {
                        success: false,
                        error: "variationId is required",
                    },
                    { status: 400 }
                );
            }

            const tracking =
                await prisma.experimentTracking.upsert({
                    where: {
                        anonymousId_experimentKey: {
                            anonymousId,
                            experimentKey,
                        },
                    },

                    create: {
                        anonymousId,
                        experimentKey,
                        experimentName:
                            experimentName ?? null,
                        variationId:
                            Number(variationId),
                        variationName:
                            variationName ?? null,
                        variationValue:
                            variationValue ?? null,
                        featureId:
                            featureId ?? null,
                    },

                    // Don't change the original
                    // experiment assignment.
                    update: {},
                });

            console.log(
                "Experiment tracking saved:",
                tracking
            );

            return Response.json({
                success: true,
                type: "experiment_exposure",
                data: tracking,
            });
        }

        // =======================================
        // TRACKED EVENTS (stored in event_tracking)
        // =======================================

        if (TRACKED_EVENTS.includes(event)) {
            // -----------------------------------
            // Validate required fields per event
            // -----------------------------------

            const requiredByEvent: Record<string, Record<string, unknown>> = {
                add_to_cart: { product_id, quantity },
                quick_view_clicked: { product_id },
                theme_toggle: { theme },
                whats_new_clicked: {},
            };
            const requiredFields = requiredByEvent[event];

            for (const [field, value] of Object.entries(requiredFields)) {
                if (value === undefined || value === null || value === "") {
                    return Response.json(
                        {
                            success: false,
                            error: `${field} is required`,
                        },
                        { status: 400 }
                    );
                }
            }

            const fields = {
                customerId: customerId ?? null,
                productId: product_id ?? null,
                productName: product_name ?? null,
                slug: slug ?? null,
                brand: brand ?? null,
                price:
                    price !== undefined && price !== null
                        ? Number(price)
                        : null,
                quantity:
                    quantity !== undefined && quantity !== null
                        ? Number(quantity)
                        : null,
                selectedSize: selected_size ?? null,
                selectedColor: selected_color ?? null,
                featureKey:
                    event === "quick_view_clicked"
                        ? featureKey ?? "quick-view-enabled"
                        : featureKey ?? null,
                featureEnabled:
                    event === "quick_view_clicked"
                        ? Boolean(featureEnabled)
                        : featureEnabled ?? null,
                experimentKey: experimentKey ?? null,
                variationId:
                    variationId !== undefined && variationId !== null
                        ? Number(variationId)
                        : null,
                theme: theme ?? null,
                source: source ?? null,
            };

            const tracking = await prisma.eventTracking.create({
                data: {
                    anonymousId,
                    event,
                    ...fields,
                },
            });

            console.log("Event tracking saved:", tracking);

            return Response.json({
                success: true,
                type: event,
                data: tracking,
            });
        }

        // =======================================
        // UNSUPPORTED EVENT
        // =======================================

        return Response.json(
            {
                success: false,
                error: `Unsupported event: ${event}`,
            },
            { status: 400 }
        );
    } catch (error) {
        console.error(
            "Analytics API error:",
            error
        );

        return Response.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            { status: 500 }
        );
    }
}