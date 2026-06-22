"use client";

import { useState, useDeferredValue, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import CategoryFilters from "@/components/CategoryFilters";
import styles from "./page.module.css";

export default function ProductsListClient({ initialProducts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    const list = initialProducts
      .map((p) => p.category?.trim())
      .filter(Boolean);
    const unique = [];
    const seen = new Set();
    for (const cat of list) {
      const lower = cat.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(cat);
      }
    }
    return ["all", ...unique];
  }, [initialProducts]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?.trim().toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initialProducts, deferredSearchQuery, selectedCategory, sortBy]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Mawla Catalog</h1>
        <p className={styles.pageSubtitle}>
          Immersive shopping interface powered by advanced App Router rendering.
        </p>
      </header>

      <section className={styles.toolbar}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <SortDropdown value={sortBy} onChange={handleSortChange} />
      </section>

      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <section className={styles.productsGridContainer}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🛍️</div>
            <h2>No products found</h2>
            <p>Try refining your search terms or selecting a different category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategorySelect("all");
                setSortBy("default");
              }}
              className={styles.resetFiltersBtn}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
