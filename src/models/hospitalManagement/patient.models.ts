import mongoose, { Model } from 'mongoose';
import User, { IRawUser, UserMethods, UserProperties, UserRole } from './user.models';
import Hospital from './hospital.models';

export interface PatientMethods extends UserMethods {
}
export interface PatientProperties extends UserProperties {
    age: number;
}
export interface IRawPatient extends IRawUser {
    currentDisease: string;
    isAdmitted: boolean;
    admittedHospitalId: mongoose.Types.ObjectId;
}
export interface IPatient extends IRawPatient, PatientMethods, PatientProperties { }  // don't add any property here use - IRawPatient
export interface PatientModel extends Model<IRawPatient, {}, PatientMethods, PatientProperties> { }
const PatientSchema = new mongoose.Schema<IRawPatient, PatientModel, PatientMethods, {}, PatientProperties>({
    currentDisease: { type: String, required: true },
    isAdmitted: { type: Boolean, default: false },
    admittedHospitalId: {
        type: mongoose.Schema.Types.ObjectId, required: function () {
            return this.isAdmitted;
        },
        ref: Hospital.modelName
    }
});
PatientSchema.virtual("age").get(function () {
    return 34
})

const Patient = User.discriminator(UserRole.PATIENT, PatientSchema)
export default Patient;
