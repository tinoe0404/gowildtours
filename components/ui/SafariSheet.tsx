"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface SheetProps {
    children: ReactNode;
}

// Simplified Sheet export since full implementation is complex
export const SafariSheet = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

export const SheetTrigger = ({ children, asChild }: any) => {
    return <>{children}</>;
};

export const SheetContent = ({ children, side = "right", className }: any) => {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className={cn(
                "fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-white shadow-xl p-6",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default SafariSheet;
