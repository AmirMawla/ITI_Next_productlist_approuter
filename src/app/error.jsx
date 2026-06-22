"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        fontSize: "5rem",
        fontWeight: "800",
        background: "var(--gradient-neon)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1rem"
      }}>Oops!</h1>
      <h2 style={{
        fontSize: "1.8rem",
        marginBottom: "1.5rem"
      }}>Something went wrong!</h2>
      <p style={{
        color: "var(--text-secondary)",
        maxWidth: "500px",
        lineHeight: "1.6",
        marginBottom: "2rem"
      }}>
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => reset()}
          style={{
            background: "var(--gradient-primary)",
            color: "var(--bg-primary)",
            padding: "12px 30px",
            borderRadius: "30px",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0, 242, 254, 0.3)",
            transition: "var(--transition-smooth)"
          }}
        >
          Try Again
        </button>
        <a
          href="/products"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            padding: "12px 30px",
            borderRadius: "30px",
            fontWeight: "700",
            transition: "var(--transition-smooth)"
          }}
        >
          Go to Catalog
        </a>
      </div>
    </div>
  );
}
