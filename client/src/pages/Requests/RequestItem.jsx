import dayjs from "dayjs";
import { useApproveRequest } from "../../hooks/useApprovals";
import { IoPersonCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { combineDateAndTime, getLastFourDigits } from "../../utils/hooks";
import { IoTime } from "react-icons/io5";

const RequestItem = ({
  title,
  description,
  _id,
  creator,
  createdAt,
  requestId,
  startTime,
  endTime,
  startDate,
  endDate,
}) => {
  const { t } = useTranslation();
  const firstFourDigits = getLastFourDigits(requestId);
  const { mutateAsync: approveRequest } = useApproveRequest();
  const handleRequestApproval = async (id, type) => {
    if (type === "reject") {
      await approveRequest({ id: requestId, type });
      return;
    }
    await approveRequest({ id: requestId });
  };

  const formatteStartDateTime =
    startDate && startTime
      ? dayjs(combineDateAndTime(startDate, startTime).$d).format(
          "MMMM D, YYYY h:mm A"
        )
      : "no date";
  const formattedEndDateTime =
    endDate && endTime
      ? dayjs(combineDateAndTime(endDate, endTime).$d).format(
          "MMMM D, YYYY h:mm A"
        )
      : "no date";
  return (
    <div className="card">
      <div>
        <div className="d-flex align-center gap-10">
          <span className="requestId">
            {firstFourDigits} &nbsp;-&nbsp;
            {t("Created At:")} {dayjs(createdAt).format("DD MMM, h A")}
          </span>
          <h3 className="requestTaskTitle">
            {t("Title")}: {title || t("no title")}
          </h3>
          <div className="userContainerFlex">
            {creator?.imageUrl ? (
              <img
                src={creator.imageUrl}
                alt="creator"
                width={50}
                height={50}
              />
            ) : (
              <IoPersonCircle size={40} />
            )}
            <p className="requestTaskOwner">
              {creator ? creator : t("no name")}
            </p>
          </div>
        </div>
        <div className="descriptionRequest">
          Description: {description || "no description"}
        </div>
        <div className="requestTime">
          <IoTime color="var(--primary-color)" size={32} />
          <p>
            &nbsp;{formatteStartDateTime}&nbsp;-&nbsp;
            {formattedEndDateTime}
          </p>
        </div>
        <div className="requestButtonsContainer">
          <button
            className={`btn createBtn requestBtn typeedit rejectBtn`}
            onClick={() => handleRequestApproval(_id, "reject")}
          >
            {t("Reject")}
          </button>
          <button
            className={`btn createBtn requestBtn typeedit`}
            onClick={() => handleRequestApproval(_id)}
          >
            {t("Accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
