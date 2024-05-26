import { useTranslation } from "react-i18next";
import Wrapper from "../../assets/styles/RequestsWrapper";
import Loader from "../../components/Loader";
import RequestItem from "./RequestItem";
import { useGetApprovals } from "../../hooks/useApprovals";

const Requests = () => {
  const { t } = useTranslation();
  const { data: requests, isLoading, isFetching, status } = useGetApprovals();
  if (isLoading || isFetching) {
    return <Loader center />;
  }
  return (
    <Wrapper>
      <h1 className="requestPageTitle">{t("Requests")}</h1>
      <p className="requestPageDesc">{t("Browse your requests here.")}</p>
      <div className="cardsContainer">
        <div className="cardsParent">
          {status === "pending" ? (
            <Loader />
          ) : status === "error" ? (
            t("Error")
          ) : requests.length > 0 ? (
            requests.map((ele, index) => {
              return (
                <RequestItem
                  key={index}
                  {...ele.relatedAppointmentId}
                  creator={ele.creator.name}
                  requestId={ele._id}
                />
              );
            })
          ) : (
            <p>{t("No requests found.")}</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Requests;
