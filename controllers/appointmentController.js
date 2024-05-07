import Appointment from "../models/Appointment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import moment from "moment";
import mongoose from "mongoose";

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

  const appointment = await Appointment.create({
    title: appointmentName,
    startDate,
    endDate,
    startTime,
    endTime,
    description: appointmentDescription,
    participants: appointmentParticipates,
    status,
    userId: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({
    appointment,
  });
};

const updateAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;

  const {
    title,
    startDate,
    endDate,
    description,
    appointmentParticipates,
    status,
  } = req.body;
  if (!title) {
    throw new BadRequestError("please provide all the values");
  }
  const appointment = await Appointment.findOne({ _id: appointmentId });

  appointment.title = title;
  appointment.date = date;
  appointment.description = description;
  appointment.participants = appointmentParticipates;
  appointment.status = status;

  await appointment.save();

  res.status(StatusCodes.OK).json({ appointment });
};
const allAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.userId });
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

export {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
};
