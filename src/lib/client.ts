import { GrowthBook } from "@growthbook/growthbook";
import { analytics } from "@/lib/analytics";
import { getAnonymousId } from "@/lib/anonymous-id";

const anonymousId = getAnonymousId();
export const growthbook =
    new GrowthBook({
        apiHost:
            process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,

        clientKey:
            process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,

        enableDevMode:
            process.env.NODE_ENV !== "production",

        trackingCallback: (
            experiment,
            result
        ) => {
            console.log(
                "GrowthBook Experiment Exposure:",
                {
                    experimentId: experiment.key,
                    variationId: result.key,
                    variationValue: result.value,
                    featureId: result.featureId,
                }
            );
            analytics.track(
                "experiment_exposure",
                {
                    anonymousId: anonymousId,
                    experimentKey: experiment.key,
                    variationId: Number(result.key),
                    variationValue: String(result.value),
                    featureId: result.featureId,
                    experimentName: experiment.name ?? null,
                    variationName: result.name ?? null,
                }
            );
        },
    });