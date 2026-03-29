import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { OrderCard } from "@/components/dashboard/OrderCard";
import { CartSummary } from "@/components/dashboard/CartSummary";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mon Espace — La Belle Table" };

async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { plat: { select: { title: true, image: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const orders = await getUserOrders(session.user.id);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING" || o.status === "PREPARING").length,
    done: orders.filter((o) => o.status === "DONE").length,
    spent: orders.filter((o) => o.status !== "CANCELLED").reduce((a, o) => a + o.total, 0),
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem", backgroundColor: "#1c1917" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "3rem 1rem" }}>

        <div style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#fbbf24", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Bienvenue
          </p>
          <h1 className="font-display" style={{ fontSize: "3rem", color: "#f5f5f4", fontWeight: 300 }}>
            {session.user.name || session.user.email}
          </h1>
          <div className="gold-divider" style={{ maxWidth: "16rem" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { label: "Commandes", value: stats.total, color: "#d6d3d1" },
            { label: "En cours", value: stats.pending, color: "#fbbf24" },
            { label: "Livrées", value: stats.done, color: "#34d399" },
            { label: "Total dépensé", value: `${stats.spent.toFixed(2)}€`, color: "#fcd34d" },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem", padding: "1.25rem" }}>
              <p style={{ color: "#78716c", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                {s.label}
              </p>
              <p className="font-display" style={{ fontSize: "2rem", fontWeight: 300, color: s.color }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.5rem", color: "#e5e5e5", marginBottom: "1.5rem" }}>
                Mes commandes
              </h2>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem" }}>
                  <p style={{ color: "#78716c", marginBottom: "1rem" }}>Aucune commande pour le moment</p>
                  <Link href="/menu" className="btn-gold">Commander maintenant</Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.5rem", color: "#e5e5e5", marginBottom: "1.5rem" }}>
                Mon panier
              </h2>
              <CartSummary />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}