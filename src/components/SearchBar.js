import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className={styles.searchWrapper}>
      <svg 
        className={styles.searchIcon} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" 
        />
      </svg>
      <input
        type="text"
        placeholder="Search products, brands, categories..."
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          className={styles.clearSearchBtn}
          onClick={onClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
