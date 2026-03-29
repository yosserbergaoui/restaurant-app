import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { PlatCard } from "@/components/menu/PlatCard";
import { MenuFilters } from "@/components/menu/MenuFilters";
import { PlatCardSkeleton } from "@/components/menu/PlatCardSkeleton";

export const revalidate = 60;
export const metadata = { title: "Menu — La Belle Table" };

async function getMenuData() {
  const [plats, categories] = await Promise.all([
    prisma.plat.findMany({
      where: { available: true },
      include: { category: true },
      orderBy: [{ category: { name: "asc" } }, { title: "asc" }],
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { plats, categories };
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const { plats, categories } = await getMenuData();

  const filteredPlats = plats.filter((plat) => {
    const matchesCategory = !category || plat.categoryId === category;
    const matchesSearch = !search || plat.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const grouped = filteredPlats.reduce<Record<string, typeof filteredPlats>>(
    (acc, plat) => {
      const catName = plat.category.name;
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(plat);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem" }}>
      <div style={{ padding: "4rem 1rem", textAlign: "center", borderBottom: "1px solid #292524" }}>
        <p style={{ color: "#fbbf24", letterSpacing: "0.2em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "1rem" }}>
          Notre sélection
        </p>
        <h1 className="section-title" style={{ color: "#f5f5f4", marginBottom: "1rem" }}>Le Menu</h1>
        <div className="gold-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />
      </div>

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <Suspense fallback={<div className="skeleton" style={{ height: "3rem", marginBottom: "2rem" }} />}>
          <MenuFilters categories={categories} />
        </Suspense>

        <p style={{ color: "#78716c", fontSize: "0.875rem", marginBottom: "2rem" }}>
          {filteredPlats.length} plat{filteredPlats.length > 1 ? "s" : ""} trouvé{filteredPlats.length > 1 ? "s" : ""}
        </p>

        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p className="font-display" style={{ color: "#78716c", fontSize: "1.5rem" }}>Aucun plat trouvé</p>
          </div>
        ) : (
          Object.entries(grouped).map(([catName, catPlats]) => (
            <section key={catName} style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <h2 className="font-display" style={{ fontSize: "1.875rem", color: "#e5e5e5", whiteSpace: "nowrap" }}>
                  {catName}
                </h2>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#292524" }} />
                <span style={{ color: "#57534e", fontSize: "0.875rem" }}>{catPlats.length} plats</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {catPlats.map((plat) => (
                  <PlatCard key={plat.id} plat={plat} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}