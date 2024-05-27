import mongoose, { Model } from 'mongoose';
import Category from './category.models';
import isURL from 'validator/lib/isURL';
import User from './user.models';

export interface IProduct {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    categoryId: mongoose.Types.ObjectId;
    ownerId: mongoose.Types.ObjectId;
}
export interface ProductProperties {
    totalStockValue: number;
    isOutOfStock: boolean;
}
export interface ProductMethods {
}
export interface ProductModel extends Model<IProduct, {}, ProductMethods, ProductProperties> { }
const productSchema = new mongoose.Schema<IProduct, ProductModel, ProductMethods, {}, ProductProperties>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, validate: [isURL, "Image url is invalid"] },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: Category.modelName },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User.modelName },
}, {
    timestamps: true,
    methods: {},
    virtuals: {
        totalStockValue: {
            get: function () {
                return this.price * this.stock;
            }
        },
        isOutOfStock: {
            get: function () {
                return this.stock < 1;
            }
        }
    }
});

const Product = mongoose.model<IProduct, ProductModel>("Product", productSchema);
export default Product;