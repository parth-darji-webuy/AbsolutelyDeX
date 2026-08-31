"use client";

import { useEffect } from "react";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { growthbook } from "@/lib/client";
import { getAnonymousId } from "@/lib/anonymous-id";

export default function GrowthBookInitializer() {
  // 1. This hook listens to the network. It will be 'false' for a split second, then automatically flip to 'true'.
  const isQAEnabled = useFeatureIsOn('enable-quality-assurance');

  useEffect(() => {
    const anonymousId = getAnonymousId();
      console.log(anonymousId);
    growthbook.setAttributes({
      id: anonymousId,
    });
  }, []);

  // 2. Log it here so you can see it re-render when the network request finishes
  console.log('Quickview QA Enabled:', isQAEnabled); 

  return null;
}