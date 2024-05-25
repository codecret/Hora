import dayjs from "dayjs";
import { useApproveRequest } from "../hooks/useApprovals";
import { IoPersonCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getLastFourDigits } from "../utils/hooks";

const RequestItem = ({ title, _id, creator, createdAt, requestId }) => {
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

  return (
    <div className="card">
      <div>
        <div className="d-flex align-center gap-10">
          <span className="requestId">{firstFourDigits}</span>
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
        <div className="requestCreatedAt">
          {t("Created At:")} {dayjs(createdAt).format("DD MMM, h A")}
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
