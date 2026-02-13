"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function LiveAvailability() {
    const [date, setDate] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "available" | "limited" | "soldout">("idle");

    const checkAvailability = () => {
        if (!date) return;
        setStatus("checking");
        // Simulate API call
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.7) setStatus("available");
            else if (random > 0.4) setStatus("limited");
            else setStatus("soldout");
        }, 1500);
    };

    return (
        <div className="bg-white/50 backdrop-blur-sm border border-beige/30 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-display font-bold text-dark-deep mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Check Availability
            </h3>

            <div className="flex gap-2">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setStatus("idle");
                    }}
                    className="flex-1 rounded-lg border border-beige/50 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <Button onClick={checkAvailability} disabled={!date || status === "checking"}>
                    {status === "checking" ? "Checking..." : "Check"}
                </Button>
            </div>

            {status !== "idle" && status !== "checking" && (
                <div className={cn("mt-4 p-3 rounded-lg text-sm font-semibold text-center border",
                    status === "available" ? "bg-green-50 text-green-700 border-green-200" :
                        status === "limited" ? "bg-orange-50 text-orange-700 border-orange-200" :
                            "bg-red-50 text-red-700 border-red-200"
                )}>
                    {status === "available" && "Dates Available! Book Now."}
                    {status === "limited" && "Only 2 spots left!"}
                    {status === "soldout" && "Sold Out for this date."}
                </div>
            )}
        </div>
    );
}
