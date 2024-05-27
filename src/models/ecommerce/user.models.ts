import mongoose, { Model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
export enum UserGender {
    Male = "MALE",
    Female = "FEMALE"
}
export interface UserProperties {
    fullName: string;
}
export interface IRawUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: number;
    dob: Date,
    gender: UserGender,
    emailVerified: boolean,
}
export interface IUser extends UserProperties { }
export interface UserModel extends Model<IRawUser, {}, {}, UserProperties> { }
const userSchema = new mongoose.Schema<IRawUser, UserModel, {}, {}, UserProperties>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: [isEmail, "Email is not valid"] },
    password: { type: String, required: true, minlength: 6 },
    dob: { type: Date, required: true },
    phoneNumber: { type: Number, default: undefined, minlength: 8, maxlength: 15 },
    gender: { type: String, enum: Object.values(UserGender), default: UserGender.Male },
    emailVerified: { type: Boolean, default: false }
}, {
    timestamps: true,
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