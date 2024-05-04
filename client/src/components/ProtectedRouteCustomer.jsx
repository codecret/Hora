import { useGetAuth } from "../hooks/useAuth";

const ProtectedRouteCustomer = () => {
  const { data: user } = useGetAuth({ state: "layout" });

  return <div>ProtectedRouteCustomer</div>;
};

export default ProtectedRouteCustomer;
