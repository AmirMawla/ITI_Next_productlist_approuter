import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this product."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description."],
    },
    category: {
      type: String,
      required: [true, "Please provide a category."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price."],
      min: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: [true, "Please provide the stock count."],
      min: 0,
    },
    brand: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    warrantyInformation: {
      type: String,
    },
    shippingInformation: {
      type: String,
    },
    returnPolicy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

ProductSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
