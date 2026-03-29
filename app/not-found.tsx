import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1c1917" }}>
      <div style={{ textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: "8rem", lineHeight: 1, color: "#292524" }}>404</p>
        <h1 className="font-display" style={{ fontSize: "2rem", color: "#d6d3d1", marginBottom: "1rem" }}>Page introuvable</h1>
        <div className="gold-divider" style={{ maxWidth: "200px", margin: "0 auto" }} />
        <p style={{ color: "#78716c", marginBottom: "2rem" }}>Cette page nexiste pas.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/" className="btn-gold">Accueil</Link>
          <Link href="/menu" className="btn-outline">Menu</Link>
        </div>
      </div>
    </div>
  );
}