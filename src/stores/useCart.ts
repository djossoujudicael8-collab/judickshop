import { create } from "zustand";
import { persist } from "zustand/middleware";

// Un article dans le panier
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Toutes les données et actions disponibles
interface CartState {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    setIsOpen: (open: boolean) => void;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;

    // Calculs
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            setIsOpen: (open) => set({ isOpen: open }),

            addItem: (item) =>
                set((state) => {
                    // Si le produit est déjà dans le panier, on augmente juste la quantité
                    const existing = state.items.find((i) => i.id === item.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    // Sinon on l'ajoute avec quantité 1
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter((i) => i.id !== id)
                            : state.items.map((i) =>
                                i.id === id ? { ...i, quantity } : i
                            ),
                })),

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: "judickshop-cart",
            // On persiste uniquement les articles, pas l'état ouvert/fermé du tiroir
            partialize: (state) => ({ items: state.items }),
        }
    )
);