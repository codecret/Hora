import smallCalendar from "/smallcalendar.png";
import bigcalendar from "/bigcalendar.png";
import twostars from "/twostars.png";
import star from "/star.png";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = ({ handleNavigate }) => {
  return (
    <div className="landing-hero-body">
      <div className="wrapper-landing">
        <div className="drop-shadow"></div>
      </div>
      <div className="landing-hero-content">
        <h1 className="landing-hero-header">
          Streamline appointment management <br />
          with a single click
        </h1>
        <p className="landing-hero-par">
          Ensured Appointment Arrangements: We&apos;ve Got You Covered!
        </p>
        <button
          className="mybtn custom-btn gradient-btn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          Get Started <IoIosArrowRoundForward size={30} />
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
