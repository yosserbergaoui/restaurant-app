import Link from "next/link";

export default function PlatNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div style={{ textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: "5rem", color: "#292524" }}>404</p>
        <h1 className="font-display" style={{ fontSize: "1.875rem", color: "#d6d3d1", marginBottom: "1rem" }}>Plat introuvable</h1>
        <p style={{ color: "#78716c", marginBottom: "2rem" }}>Ce plat nexiste pas ou a été retiré du menu.</p>
        <Link href="/menu" className="btn-gold">Retour au menu</Link>
      </div>
    </div>
  );
}