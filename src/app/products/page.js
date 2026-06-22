import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductsListClient from "./ProductsListClient";

// Disable build cache so it fetches fresh data or configure revalidation
export const revalidate = 10; // ISR for App Router

export default async function ProductsPage() {
  let products = [];
  try {
    await dbConnect();
    const productDocs = await Product.find({}).sort({ createdAt: -1 });
    products = productDocs.map((p) => {
      const doc = p.toJSON();
      if (doc.createdAt) doc.createdAt = doc.createdAt.toISOString();
      if (doc.updatedAt) doc.updatedAt = doc.updatedAt.toISOString();
      return doc;
    });
  } catch (error) {
    console.error("Failed to load products from database:", error);
  }

  return <ProductsListClient initialProducts={products} />;
}
