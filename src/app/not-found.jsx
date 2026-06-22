import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "6rem",
        fontWeight: "800",
        background: "var(--gradient-primary)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1rem"
      }}>404</h1>
      <h2 style={{
        fontSize: "1.8rem",
        marginBottom: "1.5rem"
      }}>Page Not Found</h2>
      <p style={{
        color: "var(--text-secondary)",
        maxWidth: "500px",
        lineHeight: "1.6",
        marginBottom: "2rem"
      }}>
        The catalog page or resource you are looking for has either been moved, deleted, or does not exist.
      </p>
      <Link href="/products" style={{
        background: "var(--gradient-primary)",
        color: "var(--bg-primary)",
        padding: "12px 30px",
        borderRadius: "30px",
        fontWeight: "700",
        boxShadow: "0 4px 15px rgba(0, 242, 254, 0.3)",
        transition: "var(--transition-smooth)"
      }}>
        Go to Catalog
      </Link>
    </div>
  );
}
