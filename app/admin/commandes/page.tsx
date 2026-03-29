import { prisma } from "@/lib/prisma";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export const dynamic = "force-dynamic";
export const metadata = { title: "Commandes — Admin" };

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente", PREPARING: "En préparation", DONE: "Terminée", CANCELLED: "Annulée",
};
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "rgba(161,98,7,0.5)", text: "#fbbf24" },
  PREPARING: { bg: "rgba(30,58,138,0.5)", text: "#93c5fd" },
  DONE: { bg: "rgba(6,78,59,0.5)", text: "#34d399" },
  CANCELLED: { bg: "rgba(127,29,29,0.5)", text: "#f87171" },
};

export default async function AdminCommandesPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { plat: { select: { title: true, price: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4" }}>Commandes</h1>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.entries(STATUS_LABELS).map(([status, label]) => {
            const count = orders.filter((o) => o.status === status).length;
            const colors = STATUS_COLORS[status];
            return (
              <span key={status} className="badge" style={{ backgroundColor: colors.bg, color: colors.text, padding: "0.375rem 0.75rem" }}>
                {label}: {count}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orders.map((order) => (
          <div key={order.id} style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: "#e5e5e5", fontWeight: 500 }}>{order.user.name || order.user.email}</p>
                <p style={{ color: "#78716c", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  {new Date(order.createdAt).toLocaleString("fr-FR")} · #{order.id.slice(-8)}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="font-display" style={{ fontSize: "1.5rem", color: "#fbbf24" }}>
                  {order.total.toFixed(2)}DT
                </span>
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
              </div>
            </div>

            <div style={{ borderTop: "1px solid #44403c", paddingTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {order.items.map((item) => (
                <span key={item.id} style={{ backgroundColor: "#1c1917", color: "#a8a29e", fontSize: "0.875rem", padding: "0.25rem 0.75rem", borderRadius: "0.125rem" }}>
                  {item.quantity}× {item.plat.title}
                  <span style={{ color: "#57534e", marginLeft: "0.5rem" }}>{(item.price * item.quantity).toFixed(2)}DT</span>
                </span>
              ))}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "6rem", color: "#78716c" }}>
            Aucune commande pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}