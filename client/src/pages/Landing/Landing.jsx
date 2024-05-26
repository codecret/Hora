import Wrapper from "../../assets/styles/Landing";
import Hero from "./Hero";
import Loader from "../../components/Loader";
import { useGetAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LandingBody from "./LandingBody";
import NavbarLanding from "./NavbarLanding";

const Landing = () => {
  const { isLoading, isFetching } = useGetAuth({ state: "login" });
  const navigate = useNavigate();

  const handleNavigate = (event, field) => {
    event.preventDefault();
    if (field === "login") {
      navigate("/login", { state: { isMember: true } });
    } else if (field === "signup") {
      navigate("/login", { state: { isMember: false } });
    }
  };

  const content =
    isLoading || isFetching ? (
      <Loader center />
    ) : (
      <Wrapper>
        <NavbarLanding handleNavigate={handleNavigate} />
        <Hero handleNavigate={handleNavigate} />
        <LandingBody handleNavigate={handleNavigate} />
      </Wrapper>
    );

  return content;
};

export default Landing;
