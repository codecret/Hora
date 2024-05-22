import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Choose A Title"],
      minlength: 3,
      maxlength: 30,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please Choose A description"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    notRegisteredParticipants: [
      {
        email: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Scheduled", "Canceled", "Completed"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
