import { prisma } from "@/lib/prisma";
import { PlatForm } from "@/components/admin/PlatForm";
import { createPlat } from "@/lib/actions";

export const metadata = { title: "Nouveau plat — Admin" };

export default async function NewPlatPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div style={{ padding: "2rem", maxWidth: "40rem" }}>
      <h1 className="font-display" style={{ fontSize: "2.5rem", color: "#f5f5f4", marginBottom: "2rem" }}>
        Nouveau plat
      </h1>
      <PlatForm categories={categories} action={createPlat} />
    </div>
  );
}