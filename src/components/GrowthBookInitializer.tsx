"use client";

import { useFeatureIsOn } from "@growthbook/growthbook-react";

export default function GrowthBookInitializer() {
  const isQAEnabled =
    useFeatureIsOn(
      "enable-quality-assurance"
    );

  console.log(
    "Quickview QA Enabled:",
    isQAEnabled
  );

  return null;
}