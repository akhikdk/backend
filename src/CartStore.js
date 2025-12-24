import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart store with persistence
const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      cartItems: [],

      // Actions
      addItem: (item) => {
        const existingItem = get().cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          // If item exists, increase quantity
          set({
            cartItems: get().cartItems.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            ),
          });
        } else {
          // Add new item
          set({ cartItems: [...get().cartItems, item] });
        }
      },

      removeItem: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },

      updateQty: (id, qty) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
      },

      clearCart: () => set({ cartItems: [] }),

      getTotal: () =>
        get().cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    {
      name: "cart-storage", // key in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
