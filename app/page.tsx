import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PlatCard } from "@/components/menu/PlatCard";

export const revalidate = 60;

async function getFeaturedPlats() {
  return prisma.plat.findMany({
    where: { available: true },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const featuredPlats = await getFeaturedPlats();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800')" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(28,25,23,0.75)" }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p style={{ color: "#fbbf24", letterSpacing: "0.4em", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 300 }}>
            Depuis 1997 — Paris
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, color: "#fafaf9", lineHeight: 1, marginBottom: "1.5rem" }}>
            La Belle<br />
            <em style={{ color: "#fbbf24" }}>Table</em>
          </h1>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0 auto 2rem" }} />
          <p style={{ color: "#d6d3d1", fontSize: "1.125rem", fontWeight: 300, letterSpacing: "0.025em", marginBottom: "2.5rem" }}>
            Savourez l’authenticité de la cuisine parisienne sans quitter Tunis
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/menu" className="btn-gold">Voir le menu</Link>
            <Link href="/dashboard" className="btn-outline">Mes commandes</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "6rem 1rem", backgroundColor: "#1c1917" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", textAlign: "center" }}>
          {[
            { icon: "🍽️", title: "Des saveurs d’exception", desc: "Une sélection de plus de 200 plats raffinés" },
            { icon: "👨‍🍳", title: "Chef Étoilé", desc: "Jean-Marc Durand, 2 étoiles Michelin" },
            { icon: "🌿", title: "Produits Frais", desc: "Circuits courts, producteurs locaux" },
          ].map((f) => (
            <div key={f.title}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.icon}</div>
              <h3 className="font-display" style={{ fontSize: "1.5rem", color: "#f5f5f4", marginBottom: "0.75rem" }}>{f.title}</h3>
              <p style={{ color: "#78716c", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Plats */}
      {featuredPlats.length > 0 && (
        <section style={{ padding: "6rem 1rem" }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "#fbbf24", letterSpacing: "0.2em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "1rem" }}>
                Sélection du chef
              </p>
              <h2 className="section-title" style={{ color: "#f5f5f4" }}>Nos Spécialités</h2>
              <div className="gold-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {featuredPlats.map((plat,index) => (
  <PlatCard key={plat.id} plat={plat} priority={index === 0} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/menu" className="btn-outline">Voir tout le menu →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #292524", padding: "3rem 1rem", textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: "1.5rem", color: "#78716c", marginBottom: "1rem" }}>La Belle Table</p>
        <p style={{ color: "#44403c", fontSize: "0.875rem" }}>12 Rue de la Paix, 75001 TUNIS</p>
        <div className="gold-divider" style={{ maxWidth: "150px", margin: "1.5rem auto" }} />
        <p style={{ color: "#292524", fontSize: "0.75rem" }}>© 2026 La Belle Table</p>
      </footer>
    </div>
  );
}