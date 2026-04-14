import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;             // safari slug
    name: string;           // display name
    image: string;          // image URL
    duration: string;       // e.g. "5 Days / 4 Nights"
    pricePerPerson: number; // base price
    travelers: number;      // min 1, max 8
    date: string;           // ISO date string
};

type CartStore = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateTravelers: (id: string, travelers: number) => void;
    updateDate: (id: string, date: string) => void;
    clearCart: () => void;
    subtotal: () => number;
    totalItems: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find(i => i.id === item.id);
                if (existingItem) {
                    // Item exists, just update the traveler count
                    return {
                        items: state.items.map(i =>
                            i.id === item.id 
                                ? { ...i, travelers: i.travelers + item.travelers }
                                : i
                        )
                    };
                }
                // New item
                return { items: [...state.items, item] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter(i => i.id !== id)
            })),
            updateTravelers: (id, travelers) => set((state) => ({
                items: state.items.map(i => 
                    i.id === id ? { ...i, travelers } : i
                )
            })),
            updateDate: (id, date) => set((state) => ({
                items: state.items.map(i => 
                    i.id === id ? { ...i, date } : i
                )
            })),
            clearCart: () => set({ items: [] }),
            subtotal: () => {
                return get().items.reduce((total, item) => total + (item.pricePerPerson * item.travelers), 0);
            },
            totalItems: () => {
                return get().items.length;
            }
        }),
        {
            name: 'gwt-cart', // localStorage key
        }
    )
);
