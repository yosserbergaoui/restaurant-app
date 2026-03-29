import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem", backgroundColor: "#1c1917", display: "flex" }}>
      <AdminNav />
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
    </div>
  );
}