export default function DashboardLoading() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "4rem", backgroundColor: "#1c1917" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <div className="skeleton" style={{ height: "0.75rem", width: "6rem", marginBottom: "0.75rem" }} />
        <div className="skeleton" style={{ height: "3rem", width: "16rem", marginBottom: "1rem" }} />
        <div className="skeleton" style={{ height: "1px", width: "12rem", marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem", padding: "1.25rem" }}>
              <div className="skeleton" style={{ height: "0.75rem", width: "5rem", marginBottom: "0.75rem" }} />
              <div className="skeleton" style={{ height: "2rem", width: "4rem" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: "5rem", borderRadius: "0.125rem" }} />
          ))}
        </div>
      </div>
    </div>
  );
}