"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ProductDetailClient({ product }) {
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    images,
    thumbnail,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
  } = product;

  const productImages = images && images.length > 0 ? images : [thumbnail];
  const [activeImage, setActiveImage] = useState(productImages[0]);

  const renderStars = (ratingVal) => {
    const rounded = Math.round(ratingVal);
    return (
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <span 
            key={i} 
            className={i < rounded ? styles.starFilled : styles.starEmpty}
          >
            ★
          </span>
        ))}
        <span className={styles.ratingLabel}>{ratingVal.toFixed(1)} / 5.0</span>
      </div>
    );
  };

  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link href="/products" className={styles.backButton}>
          ← Back to Catalog
        </Link>

        <section className={styles.productSection}>
          <div className={styles.galleryColumn}>
            <div className={styles.mainImageWrapper}>
              <img src={activeImage} alt={title} className={styles.mainImage} />
            </div>
            {productImages.length > 1 && (
              <div className={styles.thumbnailsGrid}>
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`${styles.thumbnailBtn} ${
                      activeImage === img ? styles.thumbnailBtnActive : ""
                    }`}
                  >
                    <img src={img} alt={`${title} preview ${idx}`} className={styles.thumbnailImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.metaRow}>
              <span className={styles.categoryTag}>{category}</span>
              {brand && <span className={styles.brandTag}>Brand: {brand}</span>}
            </div>

            <h1 className={styles.title}>{title}</h1>
            
            <div className={styles.ratingBlock}>
              {renderStars(rating)}
            </div>

            <div className={styles.pricingBlock}>
              <div className={styles.priceRow}>
                <span className={styles.price}>${price.toFixed(2)}</span>
                {originalPrice && (
                  <span className={styles.originalPrice}>${originalPrice}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <span className={styles.savingsTag}>
                  Save {Math.round(discountPercentage)}% instantly
                </span>
              )}
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.stockBlock}>
              <span className={styles.stockLabel}>Availability:</span>
              <span
                className={`${styles.stockValue} ${
                  stock > 10 ? styles.stockIn : styles.stockLow
                }`}
              >
                {stock > 0 ? `${stock} left in stock` : "Out of stock"}
              </span>
            </div>

            <div className={styles.specsGrid}>
              {warrantyInformation && (
                <div className={styles.specCard}>
                  <span className={styles.specIcon}>🛡️</span>
                  <div>
                    <h4>Warranty</h4>
                    <p>{warrantyInformation}</p>
                  </div>
                </div>
              )}
              {shippingInformation && (
                <div className={styles.specCard}>
                  <span className={styles.specIcon}>🚚</span>
                  <div>
                    <h4>Shipping Info</h4>
                    <p>{shippingInformation}</p>
                  </div>
                </div>
              )}
              {returnPolicy && (
                <div className={styles.specCard}>
                  <span className={styles.specIcon}>🔄</span>
                  <div>
                    <h4>Return Policy</h4>
                    <p>{returnPolicy}</p>
                  </div>
                </div>
              )}
            </div>

            <button 
              className={styles.addToCartBtn}
              disabled={stock === 0}
            >
              {stock > 0 ? "Order Now" : "Out of stock"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
