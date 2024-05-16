import smallCalendar from "/smallcalendar.png";
import bigcalendar from "/bigcalendar.png";
import twostars from "/twostars.png";
import star from "/star.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Hero = ({ handleNavigate }) => {
  const { t } = useTranslation();
  return (
    <div className="landing-hero-body">
      <div className="wrapper-landing">
        <div className="drop-shadow"></div>
      </div>
      <div className="landing-hero-content">
        <h1 className="landing-hero-header">
          {t("Streamline appointment management")}
          <br />
          {t("with a single click")}
        </h1>
        <p className="landing-hero-par">
          {t("Ensured Appointment Arrangements: We've Got You Covered!")}
        </p>
        <button
          className="mybtn custom-btn gradient-btn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          {t("Get Started")}
          <IoIosArrowRoundForward size={30} />
        </button>
      </div>
      <img
        src={smallCalendar}
        alt="smallCalendar"
        className="topRightImgHero"
      />
      <img src={twostars} alt="twostars" className="bottomRightImgHero" />
      <img src={bigcalendar} alt="bigcalendar" className="bottomLeftImgHero" />
      <img src={star} alt="star" className="topLefttImgHero" />
    </div>
  );
};

export default Hero;
