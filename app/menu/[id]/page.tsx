import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/menu/AddToCartButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const plats = await prisma.plat.findMany({ select: { id: true } });
  return plats.map((p) => ({ id: p.id }));
}

export default async function PlatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plat = await prisma.plat.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!plat) notFound();

  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <Link href="/menu" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#78716c", textDecoration: "none", fontSize: "0.875rem", marginBottom: "2rem" }}>
          ← Retour au menu
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div style={{ position: "relative", aspectRatio: "1", borderRadius: "0.125rem", overflow: "hidden", backgroundColor: "#292524" }}>
            {plat.image ? (
              <Image src={plat.image} alt={plat.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>🍽️</div>
            )}
            <span className="badge" style={{ position: "absolute", top: "1rem", left: "1rem", backgroundColor: "rgba(28,25,23,0.8)", color: "#fcd34d", backdropFilter: "blur(4px)" }}>
              {plat.category.name}
            </span>
          </div>

          <div style={{ padding: "1rem 0" }}>
            <h1 className="font-display" style={{ fontSize: "3rem", fontWeight: 300, color: "#f5f5f4", marginBottom: "1rem" }}>
              {plat.title}
            </h1>
            <div className="gold-divider" />

            {plat.description && (
              <p style={{ color: "#d6d3d1", lineHeight: 1.7, marginBottom: "2rem", fontSize: "1.125rem", fontWeight: 300 }}>
                {plat.description}
              </p>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
              <span className="font-display" style={{ fontSize: "2.5rem", color: "#fbbf24" }}>
                {plat.price.toFixed(2)} DT
              </span>
              <span className="badge" style={{ backgroundColor: plat.available ? "rgba(6,78,59,0.5)" : "rgba(127,29,29,0.5)", color: plat.available ? "#34d399" : "#f87171" }}>
                {plat.available ? "Disponible" : "Indisponible"}
              </span>
            </div>

            {plat.available && <AddToCartButton plat={plat} />}

            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #292524" }}>
              {["🌿 Ingrédients frais et locaux", "⚗️ Préparé à la commande", "🔔 Allergènes disponibles sur demande"].map((item) => (
                <p key={item} style={{ color: "#57534e", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}