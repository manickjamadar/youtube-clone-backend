import mongoose, { Model } from 'mongoose';
import User, { IRawUser, UserMethods, UserProperties, UserRole } from './user.models';
import Hospital from './hospital.models';
export interface IRawDoctorPractice {
    hospitalId: mongoose.Types.ObjectId;
    hourPerDay: number;
}
export interface IDoctorPractice extends IRawDoctorPractice { }
const doctorPracticeSchema = new mongoose.Schema<IDoctorPractice>({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: Hospital.modelName },
    hourPerDay: { type: Number, default: 0 },
})
export interface DoctorMethods extends UserMethods {
}
export interface DoctorProperties extends UserProperties {
}
export interface IRawDoctor extends IRawUser {
    salary: number;
    qualification: string;
    experienceInYears: number;
    practices: IDoctorPractice[]
}
export interface IDoctor extends IRawDoctor, DoctorMethods, DoctorProperties { }  // don't add any property here use - IRawDoctor
export interface DoctorModel extends Model<IRawDoctor, {}, DoctorMethods, DoctorProperties> { }
const DoctorSchema = new mongoose.Schema<IRawDoctor, DoctorModel, DoctorMethods, {}, DoctorProperties>({
    salary: { type: Number, required: true },
    qualification: { type: String, required: true },
    experienceInYears: { type: Number, default: 0 },
    practices: [doctorPracticeSchema]
});

const Doctor = User.discriminator(UserRole.DOCTOR, DoctorSchema);
export default Doctor;
