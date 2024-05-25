import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { handleOverlayClick } from "../../utils/hooks";
import FormRow from "../FormRow";
import FormRowSelect from "../FormRowSelect";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../../context/appContext";
import "./modal.css";
import { styled } from "@mui/material";
import dayjs from "dayjs";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import {
  useAddAppointment,
  useDeleteAppointment,
  useEditAppointment,
} from "../../hooks/useAppointments";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import i18n from "i18next";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import Loader from "../Loader";
import { useGetAllUsers } from "../../hooks/useAuth";

const initialState = {
  appointmentName: "",
  appointmentDescription: "",
  status: "Scheduled",
  appointmentParticipates: [],
  startDate: dayjs(),
  endDate: dayjs(),
  startTime: dayjs(),
  endTime: dayjs(),
};
const animatedComponents = makeAnimated();
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const AddAppointmentWindow = ({
  isModalOpen,
  setIsModalOpen,
  editedId,
  dates,
}) => {
  const { t } = useTranslation();
  const { data: users, isLoading, isFetching } = useGetAllUsers();

  const { appointmentStatusOptions } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [appointmentStates, setAppointmentStates] = useState(initialState);
  const { mutateAsync: createAppointment } = useAddAppointment({
    setAppointmentStates,
    setIsModalOpen,
  });
  const { mutateAsync: editAppointment } = useEditAppointment({
    setAppointmentStates,
    setIsModalOpen,
  });
  const { mutateAsync: deleteAppointment } = useDeleteAppointment({
    setAppointmentStates,
    setIsModalOpen,
  });
  const StyledDatePicker = styled(DatePicker)({
    margin: "10px 10px 10px 0px",
  });
  const StyledTimePicker = styled(TimePicker)({
    margin: "10px 10px 10px 0px",
  });
  useEffect(() => {
    const selectedAppointment = dates.find((ele) => ele.id == editedId);
    if (editedId && selectedAppointment && isModalOpen === true) {
      // Parse start and end dates
      const startDate = dayjs(selectedAppointment.start).tz(
        "Europe/Istanbul",
        true
      );
      const endDate = dayjs(selectedAppointment.end).tz(
        "Europe/Istanbul",
        true
      );
      setAppointmentStates({
        appointmentName: selectedAppointment.title,
        appointmentDescription: selectedAppointment.description,
        status: selectedAppointment.status ?? "",
        appointmentParticipates: selectedAppointment.participants ?? [],
        startDate: startDate.isValid() ? startDate : dayjs(),
        endDate: endDate.isValid() ? endDate : dayjs(),
        startTime: startDate.isValid() ? startDate : dayjs(),
        endTime: endDate.isValid() ? endDate : dayjs(),
      });
    }
  }, [editedId, isModalOpen]);
  if (isLoading || isFetching) {
    return <Loader />;
  }
  const handleCreateProject = (e) => {
    e.preventDefault();
    const { appointmentName, status } = appointmentStates;
    if (!appointmentName || !status) {
      toast.error("fill required fields.");
      return;
    }
    if (editedId) {
      editAppointment({ editedId, ...appointmentStates });
      return;
    }
    createAppointment({ ...appointmentStates });
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setAppointmentStates({ ...appointmentStates, [name]: value });
  };
  const handleDate = (name, value) => {
    setAppointmentStates({ ...appointmentStates, [name]: value });
  };
  const handleKeyDown = (event) => {
    let newMember;
    if (!inputValue) return;
    if (
      appointmentStates.appointmentParticipates.some(
        (member) => member.value === inputValue
      )
    ) {
      toast.error(t("Duplicated."));
      return;
    }
    if (appointmentStates.appointmentParticipates.length > 9) {
      toast.error(t("Participates cannot be more than 9."));
      return;
    }
    switch (event.key) {
      case "Enter":
      case "Tab":
        newMember = {
          label: inputValue,
          value: inputValue,
        };
        setAppointmentStates((prevState) => ({
          ...prevState,
          appointmentParticipates: [
            ...prevState.appointmentParticipates,
            newMember,
          ],
        }));
        setInputValue("");
        event.preventDefault();
    }
  };
  const handleCancleButton = () => {
    setIsModalOpen(false);
    setAppointmentStates(initialState);
  };
  const transformedUsers = users.map((user) => ({
    label: user.email,
    value: user._id,
  }));
  return (
    <div
      className={`overlay ${isModalOpen ? "trueWindow" : "falseWindow"}`}
      onClick={(e) => handleOverlayClick(e, setIsModalOpen)}
    >
      <div
        className={`addMemberWindow ${
          isModalOpen ? "trueWindow" : "falseWindow"
        }`}
      >
        <IoClose
          className="closeIcon"
          onClick={() => {
            setAppointmentStates(initialState);
            setIsModalOpen(false);
          }}
        />
        <h2 className="modalHeader">
          {editedId ? t("Edit Appointment") : t("Add Appointment")}
        </h2>

        <FormRow
          type={"text"}
          required={"required"}
          name={"appointmentName"}
          value={appointmentStates.appointmentName}
          handleChange={handleChangeInputs}
          divClassName={"w-100 modalDiv"}
          className={"w-100 modalInput1"}
          isLabelThere={true}
          labelText={"Meeting Title"}
          label={"Appointment Name: "}
        />
        <FormRowSelect
          labelText={"Status: "}
          name="status"
          required={"required"}
          value={appointmentStates.status}
          handleChange={handleChangeInputs}
          list={[...appointmentStatusOptions]}
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={i18n?.language}
        >
          <div className="modalDatePart">
            <StyledDatePicker
              label={t("Start Date")}
              value={appointmentStates.startDate}
              onChange={(newValue) => handleDate("startDate", newValue)}
              format="DD-MM-YYYY"
            />
            <StyledDatePicker
              label={t("End Date")}
              value={appointmentStates.endDate}
              onChange={(newValue) => handleDate("endDate", newValue)}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="modalDatePart">
            <StyledTimePicker
              label={t("Start time")}
              value={appointmentStates.startTime}
              onChange={(newValue) => handleDate("startTime", newValue)}
              format="hh:mm A"
            />
            <StyledTimePicker
              label={t("Due time")}
              value={appointmentStates.endTime}
              onChange={(newValue) => handleDate("endTime", newValue)}
              format="hh:mm A"
            />
          </div>
        </LocalizationProvider>

        <CreatableSelect
          components={animatedComponents}
          inputValue={inputValue}
          isClearable
          isMulti
          options={transformedUsers}
          onChange={(deletedValue) => {
            const updatedOptions = deletedValue.map((option) => ({
              ...option,
              isSelected: option.isSelected ?? true,
            }));

            setAppointmentStates((prevState) => ({
              ...prevState,
              appointmentParticipates: updatedOptions,
            }));
          }}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder={t("Add Participates")}
          value={appointmentStates.appointmentParticipates}
        />
        <FormRow
          type={"text"}
          inputText={"textarea"}
          name={"appointmentDescription"}
          value={appointmentStates.appointmentDescription}
          handleChange={handleChangeInputs}
          divClassName={"w-100 modalDiv"}
          className={"w-100 modalInput1"}
          isLabelThere={true}
          required={"required"}
          labelText={"Write a description"}
          label={"Description: "}
        />
        <div className="buttonContainer">
          <button
            className="reset-btn createBtn animatedBtn"
            onClick={handleCreateProject}
          >
            {editedId ? t("Edit Appointment") : t("Create Appointment")}
          </button>

          {!editedId && (
            <button
              className="reset-btn createBtn animatedBtn deleteBtn"
              onClick={handleCancleButton}
            >
              {t("Cancle Appointment")}
            </button>
          )}
          {editedId && (
            <button
              className="reset-btn createBtn animatedBtn deleteBtn"
              onClick={() => {
                deleteAppointment({ id: editedId });
              }}
            >
              {t("Delete Appointment")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentWindow;
