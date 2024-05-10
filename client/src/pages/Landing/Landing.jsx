import Hero from "../../components/Landing/Hero";
import LandingBody from "../../components/Landing/LandingBody";
import Navbar from "../../components/Landing/Navbar";
import Loader from "../../components/Loader";
import { useGetAuth } from "../../hooks/useAuth";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

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
      <Loader />
    ) : (
      <div>
        <Navbar handleNavigate={handleNavigate} />
        <Hero handleNavigate={handleNavigate} />
        <LandingBody handleNavigate={handleNavigate} />
      </div>
    );

  return content;
};

export default Landing;
