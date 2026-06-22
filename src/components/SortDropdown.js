import styles from "./SortDropdown.module.css";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className={styles.sortWrapper}>
      <label htmlFor="sort-select" className={styles.sortLabel}>Sort By</label>
      <select
        id="sort-select"
        className={styles.sortSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>
    </div>
  );
}
