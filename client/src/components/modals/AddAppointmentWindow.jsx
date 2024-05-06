import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { handleOverlayClick } from "../../utils/hooks";
import FormRow from "../FormRow";
import FormRowSelect from "../FormRowSelect";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../../context/appContext";
import "./modal.css";
import { styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
import {
  useAddAppointment,
  useEditAppointment,
} from "../../hooks/useAppointments";

const animatedComponents = makeAnimated();

const AddAppointmentWindow = ({ isModalOpen, setIsModalOpen, editedId }) => {
  const { appointmentStatusOptions } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [appointmentStates, setAppointmentStates] = useState({
    appointmentName: "",
    appointmentDescription: "",
    status: "Scheduled",
    appointmentParticipates: [],
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs(),
  });
  const { mutateAsync: createAppointment } = useAddAppointment({
    setAppointmentStates,
    setIsModalOpen,
  });
  const { mutateAsync: editAppointment } = useEditAppointment({
    setAppointmentStates,
    setIsModalOpen,
  });
  const StyledDatePicker = styled(DatePicker)({
    margin: "10px 10px 10px 0px",
  });
  const StyledTimePicker = styled(TimePicker)({
    margin: "10px 10px 10px 0px",
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const {
      appointmentName,
      appointmentDescription,
      status,
      appointmentParticipates,
      startDate,
      endDate,
      startTime,
      endTime,
    } = appointmentStates;
    if (!appointmentName || !status) {
      toast.error("fill required fields.");
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
      toast.error("Duplicated.");
      return;
    }
    if (appointmentStates.appointmentParticipates.length > 9) {
      toast.error("Participates cannot be more than 9.");
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
            setAppointmentStates({
              appointmentName: "",
              appointmentDescription: "",
              status: "active",
              appointmentParticipates: [],
            });
            setIsModalOpen(false);
          }}
        />
        <h2 className="modalHeader">
          {editedId ? "Edit Appointment" : "Add Appointment"}
        </h2>

        <FormRow
          type={"text"}
          required={"required"}
          name={"appointmentName"}
          value={appointmentStates.appointmentName}
          handleChange={handleChangeInputs}
          divClassName={"w-100 modalDiv"}
          className={"w-100 modalInput"}
          isLabelThere={true}
          labelText={"Meeting Title"}
          label={"Appointment Name:"}
        />
        <FormRowSelect
          labelText="Status:"
          name="status"
          required={"required"}
          value={appointmentStates.status}
          handleChange={handleChangeInputs}
          list={[...appointmentStatusOptions]}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            label="Start Date"
            value={appointmentStates.startDate}
            // onChange={(newValue) => setValue(newValue)}
            onChange={(newValue) => handleDate("startDate", newValue)}
          />
          <StyledDatePicker
            label="End Date"
            value={appointmentStates.endDate}
            onChange={(newValue) => handleDate("endDate", newValue)}
          />
          <StyledTimePicker
            label="Start time"
            value={appointmentStates.startTime}
            onChange={(newValue) => handleDate("startTime", newValue)}
          />
          <StyledTimePicker
            label="Due time"
            value={appointmentStates.endTime}
            onChange={(newValue) => handleDate("endTime", newValue)}
          />
        </LocalizationProvider>
        <CreatableSelect
          components={animatedComponents}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(deletedValue) =>
            setAppointmentStates((prevState) => ({
              ...prevState,
              appointmentParticipates: deletedValue,
            }))
          }
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Type something and press enter..."
          value={appointmentStates.appointmentParticipates}
        />
        <FormRow
          type={"text"}
          inputText={"textarea"}
          name={"appointmentDescription"}
          value={appointmentStates.appointmentDescription}
          handleChange={handleChangeInputs}
          divClassName={"w-100 modalDiv"}
          className={"w-100 modalInput"}
          label={"Description:"}
          isLabelThere={true}
          labelText={"Lorem ipsum dolor sit amet, consectetur "}
        />
        <button
          className="reset-btn createBtn animatedBtn"
          onClick={handleCreateProject}
        >
          {editedId ? "Edit Appointment" : "Create Appointment"}
        </button>
      </div>
    </div>
  );
};

export default AddAppointmentWindow;
