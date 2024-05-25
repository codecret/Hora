import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import moment from "moment";
import mongoose from "mongoose";
import {
  sendMultipleEmails,
  sendMultipleEmailsEdit,
} from "../services/emailService.js";
import Approvals from "../models/Approvals.js";
import { findChangedParticipants } from "../utils/hooks.js";

const createAppointment = async (req, res) => {
  let {
    appointmentName,
    appointmentDescription,
    appointmentParticipates,
    status,
    startDate,
    endDate,
    startTime,
    endTime,
  } = req.body;
  if (!appointmentName) {
    throw new BadRequestError("please provide all the values");
  }

  if (startDate) {
    startDate = new Date(startDate);
  }
  if (endDate) {
    endDate = new Date(endDate);
  }

  // first check if the email already in system or not
  // if the user is in system send an email if not send him email join hora.
  const users = await User.find();

  const participantIds = [];
  const notRegisteredParticipantIds = [];
  appointmentParticipates.forEach((participant) => {
    if (mongoose.Types.ObjectId.isValid(participant.value)) {
      participantIds.push(participant.value);
    } else {
      notRegisteredParticipantIds.push({ email: participant.label });
    }
  });

  // Create the appointment with the remaining participants
  const appointment = await Appointment.create({
    title: appointmentName,
    startDate,
    endDate,
    startTime,
    endTime,
    description: appointmentDescription,
    participants: participantIds,
    notRegisteredParticipants: notRegisteredParticipantIds,
    status,
    userId: req.user.userId,
  });

  // Function to send email based on user existence in the system
  for (const participant of appointmentParticipates) {
    const user = users.find((u) => u.email === participant.label);
    if (user) {
      await sendMultipleEmails({
        participant: participant,
        userId: req.user.userId,
        appointmentId: appointment._id,
        subject: "Appointment Confirmation",
        text: `You have been added to the appointment: ${appointmentName}`,
      });
    } else {
      await sendMultipleEmails({
        to: participant,
        userId: req.user.userId,
        appointmentId: appointment._id,
        subject: "Join Hora",
        text: "You are not using Hora yet, sign up to be added",
      });
    }
  }

  res.status(StatusCodes.CREATED).json({
    appointment,
  });
};

const updateAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;

  let {
    appointmentName,
    appointmentDescription,
    appointmentParticipates,
    status,
    startDate,
    endDate,
    startTime,
    endTime,
  } = req.body;
  if (!appointmentName) {
    throw new BadRequestError("please provide all the values");
  }
  const appointment = await Appointment.findOne({
    _id: appointmentId,
  }).populate("participants notRegisteredParticipants");

  const newParticipates = findChangedParticipants(
    appointment.participants,
    appointment.notRegisteredParticipants,
    appointmentParticipates
  );
  for (const participant of newParticipates) {
    if (mongoose.Types.ObjectId.isValid(participant.id)) {
      await sendMultipleEmailsEdit({
        participant: participant,
        userId: req.user.userId,
        appointmentId: appointment._id,
        subject: "Appointment Confirmation",
        text: `You have been added to the appointment: ${appointmentName}`,
      });
    }
  }

  const participantIds = [];
  const notRegisteredParticipantIds = [];
  appointmentParticipates.forEach((participant) => {
    if (mongoose.Types.ObjectId.isValid(participant.value)) {
      participantIds.push(participant.value);
    } else {
      notRegisteredParticipantIds.push({ email: participant.label });
    }
  });

  appointment.title = appointmentName;
  appointment.description = appointmentDescription;
  appointment.participants = participantIds;
  appointment.notRegisteredParticipants = notRegisteredParticipantIds;
  appointment.status = status;
  appointment.startDate = startDate;
  appointment.endDate = endDate;
  appointment.startTime = startTime;
  appointment.endTime = endTime;

  await appointment.save();

  res.status(StatusCodes.OK).json({ appointment });
};
const allAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    userId: req.user.userId,
  }).populate("participants");

  const statusMap = appointments.reduce((r, { status }) => {
    if (!r[status]) r[status] = 1;
    else r[status]++;
    return r;
  }, {});

  const today = moment().startOf("day");
  const nextWeek = moment(today).add(7, "days");

  // Retrieve appointments for the next 7 days and filter by userId
  const perfWeeklyApplications = await Appointment.aggregate([
    {
      $match: {
        startDate: { $gte: today.toDate(), $lt: nextWeek.toDate() },
        userId: mongoose.Types.ObjectId.createFromHexString(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$startDate" },
          month: { $month: "$startDate" },
          dayOfMonth: { $dayOfMonth: "$startDate" },
          dayOfWeek: { $dayOfWeek: "$startDate" },
          startDate: "$startDate",
        },
        value: { $sum: 1 },
      },
    },
  ]);
  const endDate = moment(today).add(7, "days"); // Get the end date (7 days from today)
  const todaysday = moment(today).format("dddd");
  const appointmentCountsByDay = []; // i will store day objects in this then do iteration

  // Iterate through each date from today until 7 days after today
  for (
    let date = moment(today);
    date.isSameOrBefore(endDate);
    date.add(1, "day")
  ) {
    // Format the current date to get the day of the week
    const dayOfWeek = date.format("dddd");

    appointmentCountsByDay.push({
      day: dayOfWeek,
      count: 0,
      fill: todaysday === dayOfWeek ? "white" : "#A5CBFF",
    }); //create the object
  }

  perfWeeklyApplications.forEach((item) => {
    // incerment the object
    const dayOfWeek = moment(item._id.startDate).format("dddd");

    // Find the corresponding object in appointmentCountsByDay array
    const dayObj = appointmentCountsByDay.find((obj) => obj.day === dayOfWeek);

    if (dayObj) {
      dayObj.count += item.value;
    }
  });

  res
    .status(StatusCodes.OK)
    .json({ appointments, statusMap, appointmentCountsByDay });
};
const allAppointmentsSearch = async (req, res) => {
  const { appointmentSearch } = req.query;
  let queryObject = { userId: req.user.userId };
  if (appointmentSearch) {
    queryObject.title = { $regex: appointmentSearch, $options: "i" };
  }
  // if (appointmentSearchStatus !== "all" && appointmentSearchStatus) {
  //   queryObject.status = appointmentSearchStatus;
  // }
  const appointments = await Appointment.find(queryObject);
  res.status(StatusCodes.OK).json({ appointments });
};
const userAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.userId });
  res.status(StatusCodes.OK).json({ appointments });
};

const deleteAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;

  const appointment = await Appointment.findOne({ _id: appointmentId });

  if (!appointment) {
    throw new NotFoundError(`No Appointment with id ${appointmentId}.`);
  }
  await appointment.deleteOne();
  res.status(StatusCodes.OK).json({ msg: `Success! Appointment removed` });
};
const deleteAllAppointments = async (req, res) => {
  await Appointment.deleteMany({});
  await Approvals.deleteMany({});
  res.status(StatusCodes.OK).json({ msg: `Success! Appointment removed` });
};
export {
  allAppointmentsSearch,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
  deleteAllAppointments,
};
