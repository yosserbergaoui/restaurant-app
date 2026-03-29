import { RegisterForm } from "@/components/auth/RegisterForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Inscription — La Belle Table" };

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1c1917" }}>
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" className="font-display" style={{ fontSize: "1.875rem", color: "#f5f5f4", textDecoration: "none" }}>
            La Belle Table
          </Link>
          <div className="gold-divider" style={{ maxWidth: "120px", margin: "0 auto" }} />
          <p style={{ color: "#78716c", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1rem" }}>
            Créer un compte
          </p>
        </div>
        <RegisterForm />
        <p style={{ textAlign: "center", color: "#78716c", fontSize: "0.875rem", marginTop: "1.5rem" }}>
          Déjà un compte ?{" "}
          <Link href="/login" style={{ color: "#fbbf24", textDecoration: "none" }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}