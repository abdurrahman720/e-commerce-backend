// import { Schema, model,mongoose } from 'mongoose';

// const userSchema = new Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       unique: [true, 'Email already registered'],
//       required: true,
//     },
//     hashedPassword: {
//       type: String,
//       required: true,
//       select:0
//     },
//     image: {
//       type: String,
//     },
//     role: {
//       type: String,
//       enum: {
//         values: ['admin', 'user']
//       },
//       default: 'user',
//     },

//     reviews: [{
//       type: mongoose.Types.ObjectId,
//       ref:'Review'
//     }],

//     orders: [{
//       type: mongoose.Types.ObjectId,
//       ref:'Order'
//     }],

//     country: {
//       type: String,
//     },
    
//     state: {
//       type: String,
//     },
//     town: {
//       type: String,
//     },

//     roadNo: {
//       type: Number,
//     },

//     houesNo: {
//       type: Number,
//     },

//     zipCode: {
//       type: Number
//     }


//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );


// userSchema.virtual('address').get(function () {
//   return `House No:${this.houesNo} , Road No:${this.roadNo}, Town: ${this.town}, State: ${this.state}, Country: ${this.country}`
// })


// export const User = model('User', userSchema);
