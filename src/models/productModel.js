import mongoose from "mongoose";
import slugify from "slugify";

const productVariationSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            unique: true,
            type: String,
        },
        description: String,
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vendor",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },
        image: [String],
        variations: [productVariationSchema],
        ratingAverage: {
            type: Number,
            default: 0,
        },
        ratingQuantity: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    { timestamps: true },
);

productSchema.pre("save", async function(next) {
    this.slug = slugify(this.name.toLowerCase());
    next();
});

export const Product = mongoose.model("Product", productSchema);
