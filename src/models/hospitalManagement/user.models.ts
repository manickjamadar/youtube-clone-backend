import mongoose, { Model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
export enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
export enum UserRole {
    DOCTOR = "DOCTOR",
    PATIENT = "PATIENT"
}
export interface UserMethods { }
export interface UserProperties {
    fullName: string;
}
export interface IRawUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    dob: Date,
    gender: UserGender,
    role: UserRole
}
export interface IUser extends UserProperties { }
export interface UserModel extends Model<IRawUser, {}, UserMethods, UserProperties> { }
const userSchema = new mongoose.Schema<IRawUser, UserModel, UserMethods, {}, UserProperties>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: [isEmail, "Email is not valid"] },
    dob: { type: Date, required: true },
    phoneNumber: { type: Number, default: undefined, minlength: 8, maxlength: 15 },
    gender: { type: String, enum: Object.values(UserGender), required: true },
    role: { type: String, enum: Object.values(UserRole), required: true }
}, {
    timestamps: true,
    discriminatorKey: "role",
    virtuals: {
        fullName: {
            get: function () {
                return `${this.firstName} ${this.lastName}`
            }
        }
    }
});

const User = mongoose.model<IRawUser, UserModel>("User", userSchema);
export default User;