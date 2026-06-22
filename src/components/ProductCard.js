import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { id, title, price, discountPercentage, rating, thumbnail, category, description } = product;

  // Generate stars based on rating
  const renderStars = (ratingVal) => {
    const rounded = Math.round(ratingVal);
    return (
      <div className={styles.starsContainer}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < rounded ? styles.starFilled : styles.starEmpty}
          >
            ★
          </span>
        ))}
        <span className={styles.ratingNumber}>({ratingVal.toFixed(1)})</span>
      </div>
    );
  };

  // Calculate original price if discount is present
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {discountPercentage > 0 && (
          <span className={styles.discountBadge}>-{Math.round(discountPercentage)}%</span>
        )}
        <img
          src={thumbnail}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <Link href={`/products/${id}`} className={styles.quickViewBtn}>
            Explore Details
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
        </div>

        <h3 className={styles.title} title={title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.ratingRow}>
          {renderStars(rating)}
        </div>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${price.toFixed(2)}</span>
            {originalPrice && (
              <span className={styles.originalPrice}>${originalPrice}</span>
            )}
          </div>
          <Link href={`/products/${id}`} className={styles.buyBtn}>
            View Page
          </Link>
        </div>
      </div>
    </div>
  );
}
