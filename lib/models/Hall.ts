// import mongoose from "mongoose";

// const hallSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },

//     description: String,

//     location: {
//       type: String,
//       required: true,
//     },

//     pricePerHour: {
//       type: Number,
//       required: true,
//     },

//     images: [String],

//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Hall ||
//   mongoose.model("Hall", hallSchema);


import mongoose from "mongoose";

const hallSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    city: {
      type: String,
      required: true,
      index: true
    },

    address: String,

    capacity: {
      type: Number,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
      index: true
    },

    amenities: [
      {
        type: String
      }
    ],

    images: [String],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true
    }

  },
  { timestamps: true }
);

export default mongoose.models.Hall ||
  mongoose.model("Hall", hallSchema);