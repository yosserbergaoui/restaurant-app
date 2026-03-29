import { auth } from "@/lib/auth";
import Link from "next/link";
import { NavClient } from "../components/NavClient";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-stone-100 hover:text-amber-400 transition-colors">
          La Belle Table
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/menu" className="text-stone-400 hover:text-stone-100 transition-colors text-sm tracking-wide">
            Menu
          </Link>
          {session && (
            <Link href="/dashboard" className="text-stone-400 hover:text-stone-100 transition-colors text-sm tracking-wide">
              Mon espace
            </Link>
          )}
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors text-sm tracking-wide">
              Admin
            </Link>
          )}
        </nav>

        <NavClient session={session} />
      </div>
    </header>
  );
}