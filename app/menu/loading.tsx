import { PlatCardSkeleton } from "@/components/menu/PlatCardSkeleton";

export default function MenuLoading() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem" }}>
      <div style={{ padding: "4rem 1rem", textAlign: "center", borderBottom: "1px solid #292524" }}>
        <div className="skeleton" style={{ height: "1rem", width: "8rem", margin: "0 auto 1rem" }} />
        <div className="skeleton" style={{ height: "3rem", width: "12rem", margin: "0 auto" }} />
      </div>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <div className="skeleton" style={{ height: "3rem", marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {Array.from({ length: 8 }).map((_, i) => <PlatCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}