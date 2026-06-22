import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Mawla Store - Curated Quality Essentials",
  description: "Discover premium products at Mawla Store. Fast search, intuitive filtering, and static rendering for a premium experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
