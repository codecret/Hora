import Wrapper from "../assets/styles/RequestsWrapper";
import Loader from "../components/Loader";
import RequestItem from "../components/RequestItem";
import { useGetApprovals } from "../hooks/useApprovals";

const Requests = () => {
  const { data: requests, isLoading, isFetching, status } = useGetApprovals();
  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <h1 className="requestPageTitle">Requests</h1>
      <p className="requestPageDesc">Browse your requests here.</p>
      <div className="cardsContainer">
        <div className="cardsParent">
          {status === "pending" ? (
            <h1>Loading</h1>
          ) : status === "error" ? (
            "Error"
          ) : requests.length > 0 ? (
            requests.map((ele, index) => {
              return (
                <RequestItem
                  key={index}
                  {...ele.relatedAppointmentId}
                  recipient={ele.recipient}
                  requestId={ele._id}
                />
              );
            })
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Requests;
