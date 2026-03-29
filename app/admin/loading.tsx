export default function AdminLoading() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="skeleton" style={{ height: "2.5rem", width: "14rem", marginBottom: "2rem" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "7rem", borderRadius: "0.125rem" }} />
        ))}
      </div>
      <div style={{ backgroundColor: "#292524", border: "1px solid #44403c", borderRadius: "0.125rem" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #44403c" }}>
          <div className="skeleton" style={{ height: "1.5rem", width: "12rem" }} />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #44403c", display: "flex", justifyContent: "space-between" }}>
            <div>
              <div className="skeleton" style={{ height: "1rem", width: "8rem", marginBottom: "0.5rem" }} />
              <div className="skeleton" style={{ height: "0.75rem", width: "12rem" }} />
            </div>
            <div className="skeleton" style={{ height: "1.5rem", width: "4rem" }} />
          </div>
        ))}
      </div>
    </div>
  );
}