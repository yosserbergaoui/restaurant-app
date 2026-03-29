import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deletePlat } from "@/lib/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gestion des plats — Admin" };

export default async function AdminPlatsPage() {
  const [plats, categories] = await Promise.all([
    prisma.plat.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4" }}>Gestion des plats</h1>
        <Link href="/admin/plats/new" className="btn-gold">+ Ajouter un plat</Link>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const count = plats.filter((p) => p.categoryId === cat.id).length;
          return (
            <span key={cat.id} className="badge" style={{ backgroundColor: "#292524", color: "#a8a29e", padding: "0.375rem 0.75rem" }}>
              {cat.name} ({count})
            </span>
          );
        })}
      </div>

      <div style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #44403c" }}>
              {["Plat", "Catégorie", "Prix", "Statut", "Actions"].map((h) => (
                <th key={h} style={{ padding: "1rem", textAlign: "left", color: "#78716c", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "normal" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plats.map((plat) => (
              <tr key={plat.id} style={{ borderBottom: "1px solid #44403c" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ position: "relative", width: "2.5rem", height: "2.5rem", borderRadius: "0.125rem", overflow: "hidden", backgroundColor: "#44403c", flexShrink: 0 }}>
                      {plat.image ? (
                        <Image src={plat.image} alt={plat.title} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>🍽️</div>
                      )}
                    </div>
                    <span style={{ color: "#e5e5e5", fontSize: "0.875rem", fontWeight: 500 }}>{plat.title}</span>
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span style={{ color: "#a8a29e", fontSize: "0.875rem" }}>{plat.category.name}</span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span className="font-display" style={{ color: "#fbbf24", fontSize: "1.125rem" }}>{plat.price.toFixed(2)}DT</span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span className="badge" style={{ backgroundColor: plat.available ? "rgba(6,78,59,0.5)" : "rgba(127,29,29,0.5)", color: plat.available ? "#34d399" : "#f87171" }}>
                    {plat.available ? "Disponible" : "Indisponible"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Link href={`/admin/plats/${plat.id}/edit`} style={{ color: "#fbbf24", fontSize: "0.875rem", textDecoration: "none" }}>
                      Modifier
                    </Link>
                    <span style={{ color: "#44403c" }}>|</span>
                    <DeleteButton id={plat.id} action={deletePlat} label="Supprimer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {plats.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center", color: "#78716c" }}>
            Aucun plat.{" "}
            <Link href="/admin/plats/new" style={{ color: "#fbbf24", textDecoration: "none" }}>Ajouter le premier →</Link>
          </div>
        )}
      </div>
    </div>
  );
}