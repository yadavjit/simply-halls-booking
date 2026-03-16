// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     hall: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Hall",
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     date: {
//       type: Date,
//       required: true,
//     },

//     startTime: {
//       type: String,
//       required: true,
//     },

//     endTime: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Booking ||
//   mongoose.model("Booking", bookingSchema);


import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },

  date: String,

  slot: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking ||
mongoose.model("Booking", bookingSchema);