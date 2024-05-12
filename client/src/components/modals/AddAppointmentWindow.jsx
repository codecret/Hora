import { DatePicker, TimePicker } from "@mui/x-date-pickers";
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
  // console.log("dates", dates);
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
  // console.log("appointmentStates", appointmentStates);
  useEffect(() => {
    const selectedAppointment = dates.find((ele) => ele.id == editedId);
    if (editedId && selectedAppointment && isModalOpen === true) {
      const participants = selectedAppointment?.participants?.map((e) => ({
        value: e,
        label: e,
      }));

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
        appointmentParticipates: participants ?? [],
        startDate: startDate.isValid() ? startDate : dayjs(),
        endDate: endDate.isValid() ? endDate : dayjs(),
        startTime: startDate.isValid() ? startDate : dayjs(),
        endTime: endDate.isValid() ? endDate : dayjs(),
      });
    }
  }, [editedId, isModalOpen]);

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
              status: "Scheduled",
              appointmentParticipates: [],
              startDate: dayjs(),
              endDate: dayjs(),
              startTime: dayjs(),
              endTime: dayjs(),
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

        <div className="modalDatePart">
          <StyledDatePicker
            label="Start Date"
            value={appointmentStates.startDate}
            // onChange={(newValue) => setValue(newValue)}
            onChange={(newValue) => handleDate("startDate", newValue)}
            format="DD-MM-YYYY"
          />
          <StyledDatePicker
            label="End Date"
            value={appointmentStates.endDate}
            onChange={(newValue) => handleDate("endDate", newValue)}
            format="DD-MM-YYYY"
          />{" "}
        </div>
        <div className="modalDatePart">
          <StyledTimePicker
            label="Start time"
            value={appointmentStates.startTime}
            onChange={(newValue) => handleDate("startTime", newValue)}
            format="hh:mm A"
          />
          <StyledTimePicker
            label="Due time"
            value={appointmentStates.endTime}
            onChange={(newValue) => handleDate("endTime", newValue)}
            format="hh:mm A"
          />
        </div>
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
        {editedId && (
          <button
            className="reset-btn createBtn animatedBtn deleteBtn"
            onClick={() => {
              deleteAppointment({ id: editedId });
            }}
          >
            Delete Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default AddAppointmentWindow;
