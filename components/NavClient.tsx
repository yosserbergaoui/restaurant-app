"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState } from "react";
import type { Session } from "next-auth";

export function NavClient({ session }: { session: Session | null }) {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard" className="relative p-2 text-stone-400 hover:text-stone-100 transition-colors">
        <ShoppingCart size={18} />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>

      <div className="hidden md:flex items-center gap-2">
        {session ? (
          <>
            <span className="text-stone-500 text-xs">{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-stone-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn-outline py-1.5 text-sm">Connexion</Link>
            <Link href="/register" className="btn-gold py-1.5 text-sm">Sinscrire</Link>
          </>
        )}
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 text-stone-400 hover:text-stone-100 transition-colors"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-stone-900 border-b border-stone-800 p-4 md:hidden flex flex-col gap-3">
          <Link href="/menu" className="text-stone-300 py-2" onClick={() => setMobileOpen(false)}>Menu</Link>
          {session && (
            <Link href="/dashboard" className="text-stone-300 py-2" onClick={() => setMobileOpen(false)}>Mon espace</Link>
          )}
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="text-amber-400 py-2" onClick={() => setMobileOpen(false)}>Administration</Link>
          )}
          {session ? (
            <button
              onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}
              className="text-red-400 py-2 text-left"
            >
              Déconnexion
            </button>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="btn-outline flex-1 text-center" onClick={() => setMobileOpen(false)}>Connexion</Link>
              <Link href="/register" className="btn-gold flex-1 text-center" onClick={() => setMobileOpen(false)}>Sinscrire</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}