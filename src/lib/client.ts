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
                    anonymous_id: anonymousId,
                    experiment_id: experiment.key,
                    variation_id: Number(result.key),
                    variation_value: String(result.value),
                    feature_id: result.featureId,
                    experiment_name: experiment.name ?? null,
                    variation_name: result.name ?? null,
                }
            );
        },
    });