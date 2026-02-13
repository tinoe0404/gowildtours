"use client";

import { useComparison } from "@/context/ComparisonContext";
import { cn } from "@/lib/cn";
import { Check, X, Minus } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function ComparisonTable() {
    const { items, removeItem } = useComparison();

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-display font-bold text-dark-deep">No items to compare</h2>
                <p className="text-warm-gray mt-2">Add items from the packages or hotels page to see them here.</p>
            </div>
        )
    }

    // Extract all unique feature keys
    const allFeatures = Array.from(new Set(items.flatMap(item => Object.keys(item.features))));

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 text-left bg-beige/10 min-w-[200px]">Feature</th>
                        {items.map((item) => (
                            <th key={item.id} className="p-4 text-left min-w-[250px] relative group">
                                <div className="space-y-3">
                                    {item.image && (
                                        <div className="relative h-40 w-full rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-display font-bold text-dark-deep">{item.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allFeatures.map((feature) => (
                        <tr key={feature} className="border-b border-beige/30 hover:bg-beige/5">
                            <td className="p-4 font-semibold text-dark-deep capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</td>
                            {items.map((item) => {
                                const value = item.features[feature];
                                return (
                                    <td key={`${item.id}-${feature}`} className="p-4 text-warm-gray">
                                        {typeof value === "boolean" ? (
                                            value ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />
                                        ) : (
                                            value ?? <Minus className="h-4 w-4 text-gray-300" />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
