import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — La Belle Table" };

export default async function AdminPage() {
  const [platsCount, categoriesCount, ordersCount, recentOrders] = await Promise.all([
    prisma.plat.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: "DONE" },
  });

  const STATUS_LABELS: Record<string, string> = {
    PENDING: "En attente", PREPARING: "En préparation", DONE: "Terminée", CANCELLED: "Annulée",
  };
  const STATUS_COLORS: Record<string, string> = {
    PENDING: "rgba(161,98,7,0.5)", PREPARING: "rgba(30,58,138,0.5)", DONE: "rgba(6,78,59,0.5)", CANCELLED: "rgba(127,29,29,0.5)",
  };
  const STATUS_TEXT: Record<string, string> = {
    PENDING: "#fbbf24", PREPARING: "#93c5fd", DONE: "#34d399", CANCELLED: "#f87171",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4", marginBottom: "2rem" }}>
        Vue densemble
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Plats au menu", value: platsCount, link: "/admin/plats" },
          { label: "Catégories", value: categoriesCount, link: "/admin/plats" },
          { label: "Commandes", value: ordersCount, link: "/admin/commandes" },
          { label: "Chiffre d'affaires", value: `${(revenue._sum.total ?? 0).toFixed(2)}€`, link: "/admin/commandes" },
        ].map((s) => (
          <Link key={s.label} href={s.link} style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem", padding: "1.5rem", textDecoration: "none", display: "block" }}>
            <p style={{ color: "#78716c", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{s.label}</p>
            <p className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4", fontWeight: 300 }}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #44403c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="font-display" style={{ fontSize: "1.5rem", color: "#e5e5e5" }}>Commandes récentes</h2>
          <Link href="/admin/commandes" style={{ color: "#fbbf24", fontSize: "0.875rem", textDecoration: "none" }}>Voir tout →</Link>
        </div>
        {recentOrders.map((order) => (
          <div key={order.id} style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #44403c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: "#e5e5e5", fontSize: "0.875rem", fontWeight: 500 }}>{order.user.name || order.user.email}</p>
              <p style={{ color: "#78716c", fontSize: "0.75rem" }}>
                {order.items.length} article{order.items.length > 1 ? "s" : ""} · {new Date(order.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="font-display" style={{ color: "#fbbf24", fontSize: "1.25rem" }}>{order.total.toFixed(2)}€</span>
              <span className="badge" style={{ backgroundColor: STATUS_COLORS[order.status], color: STATUS_TEXT[order.status] }}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>
        ))}
        {recentOrders.length === 0 && (
          <p style={{ padding: "3rem", textAlign: "center", color: "#78716c" }}>Aucune commande</p>
        )}
      </div>
    </div>
  );
}