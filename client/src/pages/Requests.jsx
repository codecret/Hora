import Wrapper from "../assets/styles/RequestsWrapper";
import Loader from "../components/Loader";
import RequestItem from "../components/RequestItem";
import { useGetApprovals } from "../hooks/useApprovals";

const Requests = () => {
  const { data: requests, isLoading, isFetching } = useGetApprovals();
  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <Wrapper>
      {requests.map((ele, index) => {
        return (
          <RequestItem
            key={index}
            {...ele.relatedAppointmentId}
            recipient={ele.recipient.name}
            requestId={ele._id}
          />
        );
      })}
    </Wrapper>
  );
};

export default Requests;
