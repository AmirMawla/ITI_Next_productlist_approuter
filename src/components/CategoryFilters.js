import styles from "./CategoryFilters.module.css";

export default function CategoryFilters({ categories, selectedCategory, onSelect }) {
  return (
    <section className={styles.categoryPills}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`${styles.categoryPill} ${
            selectedCategory === cat ? styles.categoryPillActive : ""
          }`}
        >
          {cat.replace("-", " ")}
        </button>
      ))}
    </section>
  );
}
