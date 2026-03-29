import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PlatForm } from "@/components/admin/PlatForm";
import { updatePlat } from "@/lib/actions";

export const metadata = { title: "Modifier plat — Admin" };

export default async function EditPlatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [plat, categories] = await Promise.all([
    prisma.plat.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!plat) notFound();
  const updatePlatWithId = updatePlat.bind(null, id);

  return (
    <div style={{ padding: "2rem", maxWidth: "40rem" }}>
      <h1 className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4", marginBottom: "0.5rem" }}>
        Modifier le plat
      </h1>
      <p style={{ color: "#78716c", marginBottom: "2rem" }}>{plat.title}</p>
      <PlatForm categories={categories} action={updatePlatWithId} defaultValues={plat} />
    </div>
  );
}