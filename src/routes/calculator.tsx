import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CALCULATOR_URL } from "@/lib/config";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Calculator — ConcreteLab" },
      {
        name: "description",
        content: "ConcreteLab Lab K calculator — concrete strength calculation and validation.",
      },
      { property: "og:title", content: "Calculator — ConcreteLab" },
      {
        property: "og:description",
        content: "ConcreteLab Lab K calculator — concrete strength calculation and validation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Calculator,
});

/**
 * /calculator is a thin redirect to the standalone HTML calculator that lives
 * at CALCULATOR_URL (/concrete-calculator.html). The engine is never
 * reimplemented in React; this route simply forwards the browser there.
 */
function Calculator() {
  useEffect(() => {
    window.location.replace(CALCULATOR_URL);
  }, []);

  return null;
}
