import mongoose, { Model } from 'mongoose';
export interface ICategory {
    name: string;
}
export interface CategoryModel extends Model<ICategory> { }
const categorySchema = new mongoose.Schema<ICategory, CategoryModel>({
    name: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.model<ICategory, CategoryModel>("Category", categorySchema);
export default Category;