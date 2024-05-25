import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../utils/fetch";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { convert24hoursToMinutesTime, useDebounce } from "../utils/hooks";
import { useTranslation } from "react-i18next";

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
async function getAppointmentsSearchAsync({ search }) {
  let url = "/appointment/search";
  if (search && search !== "") {
    url = url + `?appointmentSearch=${search}`;
  }
  const { data } = await authFetch(url);
  return data;
}

export function useGetAppointmentsSearch({
  search,
  debounce = 1500,
  inputRef,
}) {
  const debouncedSearchQuery = useDebounce(search, debounce);
  if (inputRef.current) {
    inputRef.current.focus();
  }
  const query = useQuery({
    queryKey: ["appointments", debouncedSearchQuery ?? ""],
    queryFn: () => getAppointmentsSearchAsync({ search: debouncedSearchQuery }),
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
  //convert it to minutes to store in database
  let convertedStartTime = convert24hoursToMinutesTime(startTime);
  let convertedEndTime = convert24hoursToMinutesTime(endTime);

  return authFetch.post("/appointment", {
    appointmentName,
    appointmentDescription,
    status,
    appointmentParticipates,
    startDate,
    endDate,
    startTime: convertedStartTime,
    endTime: convertedEndTime,
  });
};

export const useAddAppointment = ({ setAppointmentStates, setIsModalOpen }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: addAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("UnAuthenticated User Should Logout"));
        //TODO: LOGOUT
      } else {
        toast.error(e.response?.data?.msg ?? t("an error"));
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 201) {
        toast.success(t("Create Appointment Success"));
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
  //convert it to minutes to store in database
  let convertedStartTime = convert24hoursToMinutesTime(startTime);
  let convertedEndTime = convert24hoursToMinutesTime(endTime);

  return authFetch.patch(`/appointment/${editedId}`, {
    appointmentName,
    appointmentDescription,
    status,
    appointmentParticipates,
    startDate,
    endDate,
    startTime: convertedStartTime,
    endTime: convertedEndTime,
  });
};
export const useEditAppointment = ({
  setAppointmentStates,
  setIsModalOpen,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: editAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("UnAuthenticated User Should Logout"));
        //TODO: LOGOUT
      } else {
        toast.error(e.response?.data?.msg ?? t("an error"));
      }
    },
    onSuccess: (response) => {
      if (response && response.status === 200) {
        toast.success(t("Appointment Edited"));
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
  const { t } = useTranslation();

  return useMutation({
    mutationFn: deleteAppointmentAsync,
    onError: (e) => {
      if (e.response && e.response.status === 401) {
        toast.error(t("UnAuthenticated User Should Logout"));
        //TODO: LOGOUT
      } else {
        toast.error(e.response?.data?.msg ?? t("an error"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};
