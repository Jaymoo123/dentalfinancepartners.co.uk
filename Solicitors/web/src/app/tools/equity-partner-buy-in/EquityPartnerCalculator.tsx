"use client";
import { PremiumCalculator } from "@/components/tools/premium/PremiumCalculator";
import { equityPartnerBuyInConfig } from "@/lib/tools/premium/configs/equity-partner-buyin";

export function EquityPartnerCalculator() {
  return <PremiumCalculator config={equityPartnerBuyInConfig} full placement="calculator" />;
}
