import { IoIosArrowRoundForward } from "react-icons/io";
import calendar from "/calendar.svg";
import calendarnewone from "/calendarnewone.png";
import calendarnewtwo from "/calendarnewtwo.png";

const LandingBody = ({ handleNavigate }) => {
  return (
    <div>
      <div className="landing-body">
        <p className="landing-b-header">Seamless Scheduling Made Simple</p>
        <p className="landing-b-sub">
          Your Calendar&apos;s Best Companion for Effortless Appointments
        </p>
      </div>
      <div className="landing-sub">
        <div className="backgroundPrimary">
          <div className="backgroundlanding">
            <img src={calendar} alt="Your SVG" className="calendarnewone" />
            <img
              src={calendarnewone}
              alt="Your SVG"
              className="calendaricon2"
            />
            <img
              src={calendarnewtwo}
              alt="Your SVG"
              className="calendaricon1"
            />
          </div>
        </div>
      </div>
      <footer className="landing-footer">
        <p className="landing-b-header">Begin Your Journey Today</p>
        <p className="landing-b-sub">
          Your Path to Efficient Scheduling Starts Here
        </p>
        <button
          className="mybtn custom-btn gradient-btn footerbtn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          Get Started <IoIosArrowRoundForward size={30} />
        </button>
      </footer>
    </div>
  );
};

export default LandingBody;
