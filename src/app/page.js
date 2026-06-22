import Link from "next/link";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

async function getQuote() {

  try {
    const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch quote");
    return await res.json();
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      quote: "Quality is not an act, it is a habit.",
      author: "Aristotle",
    };
  }
}

export default async function Home() {
  const quote = await getQuote();

  return (
    <div className={styles.heroContainer}>
      <header className={styles.heroContent}>
        <div className={styles.badge}>NEW ARRIVALS</div>
        <h1 className={styles.title}>
          Mawla Store <br />
          <span className={styles.primaryText}>modern lifestyles.</span>
        </h1>
        <p className={styles.subtitle}>
          Explore our collections from electronics to apparel and find exactly what you need.
        </p>
        
        <div className={styles.actions}>
          <Link href="/products" className={styles.primaryBtn}>
            Browse Collection
          </Link>
          <a href="#features" className={styles.secondaryBtn}>
            Our Features
          </a>
        </div>

        {quote && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.quoteContainer}>
              <p className={styles.quoteText}>"{quote.quote}"</p>
              <p className={styles.quoteAuthor}>— {quote.author}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
