import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../utils/fetch";
import toast from "react-hot-toast";
import dayjs from "dayjs";

async function getAppointmentsAsync() {
  const { data } = await authFetch("/appointment");
  return data;
}

export function useGetAppointments() {
  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointmentsAsync(),
    keepPreviousData: true,
  });
  return query;
}

const addAppointmentAsync = ({
  appointmentName,
  appointmentDescription,
  status,
  appointmentParticipates,
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const appointment = appointmentParticipates?.map((ele) => ele.value);
  console.log(
    appointmentName,
    appointmentDescription,
    status,
    appointment,
    startDate,
    endDate,
    startTime,
    endTime
  );
  return authFetch.post("/appointment", {
    appointmentName,
    appointmentDescription,
    status,
    appointmentParticipates: appointment,
    startDate,
    endDate,
    startTime,
    endTime,
  });
};

export const useAddAppointment = ({ setAppointmentStates, setIsModalOpen }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User Should Logout");
        //TODO: LOGOUT
      } else {
        toast.error(e.response?.data?.msg ?? "an error");
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 201) {
        toast.success("Create Appointment Success");
      }
      setAppointmentStates({
        appointmentName: "",
        appointmentDescription: "",
        status: "active",
        appointmentParticipates: [],
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: dayjs(),
        endTime: dayjs(),
      });
      setIsModalOpen(false);
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};
const editAppointmentAsync = ({
  appointmentName,
  appointmentDescription,
  status,
  appointmentParticipates,
  startDate,
  endDate,
  startTime,
  endTime,
  editedId,
}) => {
  const participants = appointmentParticipates.map((ele) => ele.value);

  return authFetch.patch(`/appointment/${editedId}`, {
    appointmentName,
    appointmentDescription,
    status,
    participants,
    startDate,
    endDate,
    startTime,
    endTime,
  });
};
export const useEditAppointment = ({
  setAppointmentStates,
  setIsModalOpen,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User Should Logout");
        //TODO: LOGOUT
      } else {
        toast.error(e.response.data.msg);
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success("Project Edited");
      }
      setAppointmentStates({
        appointmentName: "",
        appointmentDescription: "",
        status: "Scheduled",
        appointmentParticipates: [],
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: dayjs(),
        endTime: dayjs(),
      });
      setIsModalOpen(false);
      queryClient.invalidateQueries(["adminappointments"]);
    },
  });
};

const deleteAppointmentAsync = ({ id }) => {
  return authFetch.delete(`/appointment/${id}`);
};
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error("UnAuthenticated User Should Logout");
        //TODO: LOGOUT
      } else {
        toast.error(e.response.data.msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};
