// import Doctor from "./models/hospitalManagement/doctor.models";
// import Patient from "./models/hospitalManagement/patient.models";
// import { UserGender, UserRole } from "./models/hospitalManagement/user.models";
// import User from "./models/hospitalManagement/user.models";

import Hospital from "./models/hospitalManagement/hospital.models"

// const patient = new Patient({
//     firstName: "Manick",
//     lastName: "Jamadar",
//     dob: new Date(),
//     email: "manick@gmail.com",
//     gender: UserGender.MALE,
//     phoneNumber: 978675656,
// })
// const doctor = new Doctor({
//     firstName: "John",
//     lastName: "Doe",
//     dob: new Date(),
//     email: "john@gmail.com",
//     gender: UserGender.MALE,
//     phoneNumber: 978675656,
//     salary: 34322
// })
// console.log(doctor.toObject({ virtuals: true }));
const hos = new Hospital({
    name: "adf",
    address: "adasdwek",
    specilizedIn: ["asdf", "hosf", "adsf"]
})
console.log(hos)