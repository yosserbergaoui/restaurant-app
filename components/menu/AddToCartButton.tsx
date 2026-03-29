"use client";

import { useCart } from "@/components/CartProvider";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

type Plat = {
  id: string;
  title: string;
  price: number;
  image?: string | null;
};

export function AddToCartButton({ plat }: { plat: Plat }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === plat.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({ id: plat.id, title: plat.title, price: plat.price, image: plat.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleAdd}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm font-medium transition-all duration-300 ${
          added ? "bg-emerald-700 text-white" : "bg-amber-600 hover:bg-amber-500 text-white"
        }`}
      >
        {added ? (
          <><Check size={16} />Ajouté au panier</>
        ) : (
          <><ShoppingCart size={16} />Ajouter au panier</>
        )}
      </button>

      {quantity > 0 && (
        <p className="text-center text-stone-500 text-sm">
          {quantity} déjà dans votre panier
        </p>
      )}
    </div>
  );
}