"use client";

import { useEffect } from "react";
import { initInteractions } from "@/app/interactions";

export function Interactions() {
  useEffect(() => {
    initInteractions();
  }, []);
  return null;
}
