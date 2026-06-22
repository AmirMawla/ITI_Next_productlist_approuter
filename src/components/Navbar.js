"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          MAWLA<span className={styles.logoDot}>.</span>
        </Link>
        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`${styles.navLink} ${pathname.startsWith("/products") ? styles.active : ""}`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
