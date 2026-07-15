import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export const POST = createLeadSubmitHandler({ source: "ecommerce" });
