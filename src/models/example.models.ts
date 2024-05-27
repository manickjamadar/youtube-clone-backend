import mongoose, { Model } from 'mongoose';

export interface ExampleMethods {
    methodOne: () => string;
}
export interface ExampleProperties {
    propertyThree: string;
}
export interface IRawExample {
    propertyOne: string;
    propertyTwo: string;
}
export interface IExample extends IRawExample, ExampleMethods, ExampleProperties { }  // don't add any property here use - IRawExample
export interface ExampleModel extends Model<IRawExample, {}, ExampleMethods, ExampleProperties> { }
const ExampleSchema = new mongoose.Schema<IRawExample, ExampleModel, ExampleMethods, {}, ExampleProperties>({
    propertyOne: { type: String },
    propertyTwo: { type: String }
}, {
    timestamps: true,
    methods: {
        methodOne: function () { return "" }
    },
    virtuals: {
        propertyThree: {
            get: function () { return "" }
        }
    }
});

const Example = mongoose.model<IRawExample, ExampleModel>("Example", ExampleSchema);
export default Example;
