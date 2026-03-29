"use client";

import { useCart } from "@/components/CartProvider";
import { createOrder } from "@/lib/actions";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import Link from "next/link";

export function CartSummary() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleOrder = () => {
    startTransition(async () => {
      const orderItems = items.map((i) => ({
        platId: i.id,
        quantity: i.quantity,
        price: i.price,
      }));

      const result = await createOrder(orderItems);
      if (result.success) {
        clearCart();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  if (success) {
    return (
      <div className="bg-stone-900 border border-emerald-800/50 rounded-sm p-6 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <p className="text-emerald-400 font-medium mb-2">Commande passée !</p>
        <p className="text-stone-500 text-sm">Votre commande est en préparation.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-stone-900 border border-stone-800 rounded-sm p-8 text-center">
        <ShoppingCart size={32} className="mx-auto text-stone-700 mb-3" />
        <p className="text-stone-500 text-sm mb-4">Votre panier est vide</p>
        <Link href="/menu" className="btn-gold text-sm">Voir le menu</Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden">
      <div className="p-4 border-b border-stone-800">
        <h3 className="font-display text-lg text-stone-200">
          Panier ({items.length} article{items.length > 1 ? "s" : ""})
        </h3>
      </div>

      <div className="divide-y divide-stone-800 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-stone-800 flex-shrink-0">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg">🍽️</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-stone-200 text-sm truncate">{item.title}</p>
              <p className="text-amber-400 text-sm font-display">{item.price.toFixed(2)}€</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-6 h-6 rounded-sm bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 transition-colors"
              >
                <Minus size={10} />
              </button>
              <span className="w-6 text-center text-stone-300 text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-6 h-6 rounded-sm bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 transition-colors"
              >
                <Plus size={10} />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="w-6 h-6 rounded-sm hover:bg-red-900/30 flex items-center justify-center text-stone-600 hover:text-red-400 transition-colors ml-1"
              >
                <Trash2 size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-stone-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-stone-400 text-sm">Total</span>
          <span className="font-display text-2xl text-amber-400">{total.toFixed(2)}€</span>
        </div>
        <button
          onClick={handleOrder}
          disabled={isPending}
          className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "En cours..." : "Passer la commande"}
        </button>
      </div>
    </div>
  );
}