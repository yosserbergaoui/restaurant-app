"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/plats", label: "Gestion des plats" },
  { href: "/admin/commandes", label: "Commandes" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "16rem",
      borderRight: "1px solid #292524",
      backgroundColor: "rgba(41,37,36,0.5)",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: "calc(100vh - 4rem)"
    }}>
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #292524" }}>
        <p style={{ color: "#fbbf24", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          Administration
        </p>
        <p className="font-display" style={{ fontSize: "1.25rem", color: "#e5e5e5" }}>La Belle Table</p>
      </div>

      <nav style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.625rem 0.75rem",
                borderRadius: "0.125rem",
                color: isActive ? "#f5f5f4" : "#a8a29e",
                backgroundColor: isActive ? "#292524" : "transparent",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "all 0.2s",
                borderLeft: isActive ? "2px solid #d97706" : "2px solid transparent",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1rem", borderTop: "1px solid #292524" }}>
        <Link href="/dashboard" style={{ color: "#57534e", fontSize: "0.875rem", textDecoration: "none" }}>
          ← Espace client
        </Link>
      </div>
    </aside>
  );
}