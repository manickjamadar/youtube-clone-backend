import mongoose, { Model } from 'mongoose';

export interface HospitalMethods {
}
export interface HospitalProperties {
}
export interface IRawHospital {
    name: string;
    address: string;
    specilizedIn: string[]
}
export interface IHospital extends IRawHospital, HospitalMethods, HospitalProperties { }  // don't add any property here use - IRawHospital
export interface HospitalModel extends Model<IRawHospital, {}, HospitalMethods, HospitalProperties> { }
const HospitalSchema = new mongoose.Schema<IRawHospital, HospitalModel, HospitalMethods, {}, HospitalProperties>({
    name: { type: String, required: true },
    address: { type: String, reqiured: true },
    specilizedIn: [{ type: String, required: true }]
}, {
    timestamps: true,
    methods: {},
    virtuals: {}
});
const Hospital = mongoose.model<IRawHospital, HospitalModel>("Hospital", HospitalSchema);
export default Hospital;
