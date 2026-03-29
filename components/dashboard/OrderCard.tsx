import Image from "next/image";

const STATUS_CONFIG = {
  PENDING: { label: "En attente", color: "bg-yellow-900/50 text-yellow-400", dot: "bg-yellow-400" },
  PREPARING: { label: "En préparation", color: "bg-blue-900/50 text-blue-400", dot: "bg-blue-400" },
  DONE: { label: "Terminée", color: "bg-emerald-900/50 text-emerald-400", dot: "bg-emerald-400" },
  CANCELLED: { label: "Annulée", color: "bg-red-900/50 text-red-400", dot: "bg-red-400" },
};

type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
  items: {
    id: string;
    quantity: number;
    plat: { title: string; image?: string | null };
  }[];
};

export function OrderCard({ order }: { order: Order }) {
  const config = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || {
    label: order.status,
    color: "bg-stone-800 text-stone-400",
    dot: "bg-stone-400",
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${config.dot} ${order.status === "PREPARING" ? "animate-pulse" : ""}`} />
          <span className={`badge ${config.color}`}>{config.label}</span>
          <span className="text-stone-600 text-xs">#{order.id.slice(-8)}</span>
        </div>
        <div className="text-right">
          <p className="font-display text-xl text-amber-400">{order.total.toFixed(2)}€</p>
          <p className="text-stone-600 text-xs">
            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 bg-stone-800 rounded-sm px-3 py-1.5">
            {item.plat.image && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image src={item.plat.image} alt={item.plat.title} fill className="object-cover" />
              </div>
            )}
            <span className="text-stone-300 text-xs">
              {item.quantity}× {item.plat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}