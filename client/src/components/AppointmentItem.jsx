import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { convertMinutesTo24hoursTime } from "../utils/hooks";
import { useTranslation } from "react-i18next";
import Wrapper from "../assets/styles/AppointmentItemWrapper";

const AppointmentItem = ({
  title,
  startDate,
  startTime,
  endTime,
  participants,
  description,
}) => {
  const { t, i18n } = useTranslation();
  if (i18n.language === "tr") {
    dayjs.locale("tr");
  }
  const emptyStartDate = startDate || "";
  const emptyStartTime = startTime
    ? convertMinutesTo24hoursTime(startTime)
    : "";
  const emptyEndTime = endTime ? convertMinutesTo24hoursTime(endTime) : "";
  const formattedStartDate = dayjs(emptyStartDate).format("dddd, MMM D");

  return (
    <Wrapper>
      <div className="card-leftside">
        <h2 className="appointment-title">{title}</h2>
        <div className="appointment-date">
          <Icon icon="majesticons:calendar-line" width="1.2em" height="1.2em" />
          <p>{startDate && formattedStartDate}</p>
        </div>
        {startTime && (
          <div className="appointment-time">
            <Icon icon="majesticons:clock-line" width="1.2em" height="1.2em" />
            <p>{`${startTime && emptyStartTime} - ${
              endTime && emptyEndTime
            }`}</p>
          </div>
        )}
      </div>
      <div className="card-rightside">
        <p className="appointment-name">
          {participants.length > 1
            ? `${participants[0]} +${participants.length - 1} ${t("others")}.`
            : participants.length === 1
            ? participants[0].name
            : "no participates"}
        </p>
        <p className="appointment-description">{description}</p>
      </div>
    </Wrapper>
  );
};

export default AppointmentItem;
