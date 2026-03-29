import { LoginForm } from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Connexion — La Belle Table" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");
  const { registered } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1c1917" }}>
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" className="font-display" style={{ fontSize: "1.875rem", color: "#f5f5f4", textDecoration: "none" }}>
            La Belle Table
          </Link>
          <div className="gold-divider" style={{ maxWidth: "120px", margin: "0 auto" }} />
          <p style={{ color: "#78716c", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1rem" }}>
            Connexion
          </p>
        </div>

        {registered && (
          <div style={{ marginBottom: "1.5rem", padding: "0.75rem 1rem", backgroundColor: "rgba(6,78,59,0.3)", border: "1px solid #065f46", borderRadius: "0.125rem", color: "#34d399", fontSize: "0.875rem", textAlign: "center" }}>
             Compte créé avec succès. Connectez-vous.
          </div>
        )}

        <LoginForm />

        <p style={{ textAlign: "center", color: "#78716c", fontSize: "0.875rem", marginTop: "1.5rem" }}>
          Pas encore de compte ?{" "}
          <Link href="/register" style={{ color: "#fbbf24", textDecoration: "none" }}>Sinscrire</Link>
        </p>
      </div>
    </div>
  );
}