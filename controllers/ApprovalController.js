import { StatusCodes } from "http-status-codes";
import Approvals from "../models/Approvals.js";
import Appointment from "../models/Appointment.js";
import NotFoundError from "../errors/not-found.js";

const getApprovalForUser = async (req, res) => {
  const approvals = await Approvals.find({
    recipient: req.user.userId,
  }).populate("relatedAppointmentId recipient creator");
  res.status(StatusCodes.OK).json({ approvals });
};

const approveRequest = async (req, res) => {
  const { id } = req.params; // this is approval id
  const approval = await Approvals.findOne({ _id: id })
    .populate("relatedAppointmentId")
    .select("-createdAt -updatedAt -__v -_id");
  if (!approval) {
    throw new NotFoundError(`No approval with id.`);
  }

  const appointmentValues = approval.relatedAppointmentId.toObject();
  const updatedAppointment = await Appointment.create({
    title: appointmentValues.title,
    startDate: appointmentValues.startDate,
    endDate: appointmentValues.endDate,
    startTime: appointmentValues.startTime,
    endTime: appointmentValues.endTime,
    description: appointmentValues.description,
    participants: appointmentValues.participants,
    notRegisteredParticipants: appointmentValues.notRegisteredParticipants,
    status: appointmentValues.status,
    userId: req.user.userId,
  });

  if (!updatedAppointment) {
    throw new NotFoundError(
      `No appointment with id ${approval.relatedAppointmentId._id}.`
    );
  }

  await Approvals.findByIdAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Done" });
};

const rejectApproveRequest = async (req, res) => {
  const { id } = req.params; // this is approval id

  const approval = await Approvals.findOne({ _id: id });

  if (!approval) {
    throw new NotFoundError(`user not included already.`);
  }
  await approval.deleteOne();
  res.status(StatusCodes.OK).json({ msg: `Success! Approval removed` });
};
export { getApprovalForUser, approveRequest, rejectApproveRequest };
