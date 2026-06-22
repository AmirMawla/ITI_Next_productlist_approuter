import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./ProductForm.module.css";

export default function ProductForm({ mode = "add", initialData = null, onSubmitSuccess = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "0",
    rating: "0",
    stock: "",
    brand: "",
    images: "",
    thumbnail: "",
    warrantyInformation: "",
    shippingInformation: "",
    returnPolicy: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        price: initialData.price !== undefined ? String(initialData.price) : "",
        discountPercentage: initialData.discountPercentage !== undefined ? String(initialData.discountPercentage) : "0",
        rating: initialData.rating !== undefined ? String(initialData.rating) : "0",
        stock: initialData.stock !== undefined ? String(initialData.stock) : "",
        brand: initialData.brand || "",
        images: Array.isArray(initialData.images) ? initialData.images.join(", ") : initialData.images || "",
        thumbnail: initialData.thumbnail || "",
        warrantyInformation: initialData.warrantyInformation || "",
        shippingInformation: initialData.shippingInformation || "",
        returnPolicy: initialData.returnPolicy || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imagesArray = formData.images
      ? formData.images.split(",").map((img) => img.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
      rating: parseFloat(formData.rating) || 0,
      stock: parseInt(formData.stock) || 0,
      images: imagesArray,
    };

    const toastId = toast.loading(mode === "add" ? "Creating product..." : "Updating product...");

    try {
      const url = mode === "add" ? "/api/products" : `/api/products/${initialData.id}`;
      const method = mode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(
        mode === "add" ? "Product created successfully!" : "Product updated successfully!",
        { id: toastId }
      );

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>{mode === "add" ? "Add New Product" : "Edit Product"}</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="e.g. iPhone 15 Pro"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className={styles.textarea}
          placeholder="Detailed product description..."
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g. electronics"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g. Apple"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Price ($) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="0.00"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Discount (%)</label>
          <input
            type="number"
            step="0.1"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className={styles.input}
            placeholder="0"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="10"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Rating (0 - 5)</label>
          <input
            type="number"
            step="0.1"
            max="5"
            min="0"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={styles.input}
            placeholder="4.5"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Thumbnail URL</label>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://example.com/thumb.jpg"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Images (Comma separated URLs)</label>
        <textarea
          name="images"
          value={formData.images}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Warranty Information</label>
        <input
          type="text"
          name="warrantyInformation"
          value={formData.warrantyInformation}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g. 1 year warranty"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Shipping Information</label>
        <input
          type="text"
          name="shippingInformation"
          value={formData.shippingInformation}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g. Ships in 1-2 business days"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Return Policy</label>
        <input
          type="text"
          name="returnPolicy"
          value={formData.returnPolicy}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g. 30 days return policy"
        />
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {mode === "add" ? "Create Product" : "Save Changes"}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      )}
    </form>
  );
}
