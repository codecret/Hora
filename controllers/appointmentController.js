import Appointment from "../models/Appointment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import moment from "moment";

const createAppointment = async (req, res) => {
  const { title, description, participant, status } = req.body;

  if (!title) {
    throw new BadRequestError("please provide all the values");
  }
  if (req.body.date) {
    req.body.date = new Date(req.body.date);
  }

  const appointment = await Appointment.create({
    title,
    date: req.body.date,
    description,
    participant,
    status,
    userId: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({
    appointment,
  });
};

const updateAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;

  const { title, date, description, participant, status } = req.body;
  if (!title) {
    throw new BadRequestError("please provide all the values");
  }
  const appointment = await Appointment.findOne({ _id: appointmentId });

  appointment.title = title;
  appointment.date = date;
  appointment.description = description;
  appointment.participant = participant;
  appointment.status = status;

  await appointment.save();

  res.status(StatusCodes.OK).json({ appointment });
};
const allAppointments = async (req, res) => {
  const appointments = await Appointment.find({});
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

const getAppointmentsStats = async (req, res) => {
  const appointment = await Appointment.find({ userId: req.user.userId });
  if (!appointment) {
    throw new NotFoundError(`Not Valid backlog`);
  }
  let AppointmentsStatus = await Appointment.find({});
  AppointmentsStatus = AppointmentsStatus.reduce((r, { status }) => {
    if (status) {
      if (!r[status]) r[status] = 1;
      else r[status]++;
    }
    return r;
  }, {});
  let perfWeeklyApplications = await Appointment.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          dayOfMonth: { $dayOfMonth: "$createdAt" },
          dayOfWeek: { $dayOfWeek: "$createdAt" },
        },
        value: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.dayOfMonth": 1 } },
  ]);
  console.log(perfWeeklyApplications);
  const today = moment().startOf("day");
  const nextWeek = moment(today).add(7, "days").startOf("day");
  perfWeeklyApplications = perfWeeklyApplications
    .map((item) => {
      const {
        _id: { year, month, dayOfMonth },
        value,
      } = item;
      const date = moment()
        .year(year)
        .month(month - 1)
        .date(dayOfMonth)
        .startOf("day");
      return { date, value };
    })
    .filter(
      (item) => item.date.isSameOrAfter(today) && item.date.isBefore(nextWeek)
    );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = moment(today).add(i, "days");
    const dayOfWeek = days[day.day()];
    const appointmentsOnDay = perfWeeklyApplications.find(
      (item) => item.date.day() === day.day()
    );
    weekDays.push({
      date: dayOfWeek,
      value: appointmentsOnDay ? appointmentsOnDay.value : 0,
    });
  }

  res.status(StatusCodes.OK).json({
    AppointmentsStatus,
    perfWeeklyApplications: weekDays,
    countsOfAppointments: perfWeeklyApplications.reduce(
      (acc, curr) => acc + curr.value,
      0
    ),
  });
};

export {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  allAppointments,
  userAppointments,
  getAppointmentsStats,
};
