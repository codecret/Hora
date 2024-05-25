import dayjs from "dayjs";
import { useApproveRequest } from "../hooks/useApprovals";
import { IoPersonCircle } from "react-icons/io5";

const RequestItem = ({ title, _id, recipient, createdAt, requestId }) => {
  const firstFourDigits = requestId.slice(0, 4);
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
          <h3 className="requestTaskTitle">Title: {title || "no title"}</h3>
          <div className="userContainerFlex">
            {recipient?.imageUrl ? (
              <img
                src={recipient.imageUrl}
                alt="recipient"
                width={50}
                height={50}
              />
            ) : (
              <IoPersonCircle size={40} />
            )}
            <p className="requestTaskOwner">
              {recipient.name ? recipient.name : "no name"}
            </p>
          </div>
        </div>
        <div className="requestCreatedAt">
          Created At : {dayjs(createdAt).format("DD MMM ,h A")}
        </div>
        <div className="requestButtonsContainer">
          <button
            className={`btn createBtn requestBtn typeedit rejectBtn`}
            onClick={() => handleRequestApproval(_id, "reject")}
          >
            Reject
          </button>
          <button
            className={`btn createBtn requestBtn typeedit`}
            onClick={() => handleRequestApproval(_id)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
