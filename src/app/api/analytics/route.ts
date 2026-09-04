import { prisma } from "@/lib/prisma";

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
            // Add to Cart fields
            // ---------------------------------------
            product_id,
            product_name,
            slug,
            brand,
            price,
            quantity,
            selected_size,
            selected_color,
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
        // ADD TO CART
        // =======================================

        if (event === "add_to_cart") {
            // -----------------------------------
            // Validate product
            // -----------------------------------

            if (!product_id) {
                return Response.json(
                    {
                        success: false,
                        error: "product_id is required",
                    },
                    { status: 400 }
                );
            }

            if (
                quantity === undefined ||
                quantity === null
            ) {
                return Response.json(
                    {
                        success: false,
                        error: "quantity is required",
                    },
                    { status: 400 }
                );
            }

            // -----------------------------------
            // Insert Add To Cart event
            // -----------------------------------

            const tracking =
                await prisma.addToCartTracking.create({
                    data: {
                        anonymousId,

                        productId:
                            product_id,

                        productName:
                            product_name ?? null,

                        slug:
                            slug ?? null,

                        brand:
                            brand ?? null,

                        price:
                            price !== undefined &&
                            price !== null
                                ? Number(price)
                                : null,

                        quantity:
                            Number(quantity),

                        selectedSize:
                            selected_size ?? null,

                        selectedColor:
                            selected_color ?? null,
                    },
                });

            console.log(
                "Add to Cart tracking saved:",
                tracking
            );

            return Response.json({
                success: true,
                type: "add_to_cart",
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