import { IoIosArrowRoundForward } from "react-icons/io";
import calendar from "/calendar.svg";
import calendarnewone from "/calendarnewone.png";
import calendarnewtwo from "/calendarnewtwo.png";
import { useTranslation } from "react-i18next";

const LandingBody = ({ handleNavigate }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="landing-body">
        <p className="landing-b-header">
          {t("Seamless Scheduling Made Simple")}
        </p>
        <p className="landing-b-sub">
          {t("Your Calendar's Best Companion for Effortless Appointments")}
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
        <p className="landing-b-header">{t("Begin Your Journey Today")}</p>
        <p className="landing-b-sub">
          {t("Your Path to Efficient Scheduling Starts Here")}
        </p>
        <button
          className="mybtn custom-btn gradient-btn footerbtn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          {t("Get Started")}
          <IoIosArrowRoundForward size={30} />
        </button>
      </footer>
    </div>
  );
};

export default LandingBody;
