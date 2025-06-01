import styled from "styled-components";

const Wrapper = styled.section`
  /* @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"); */

  .navContainer {
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    font-family: var(--bodyFont);
  }
  .navBtns {
    display: flex;
    align-items: center;
  }
  .lang-container {
    top: 50px !important;
  }
  .nav-login-btn {
    font-size: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    background-color: transparent;
  }
  .secBtn {
    font-size: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    padding: 0.5rem 1rem !important;
    background-color: #3668f8 !important;
  }

  /* body */
  .landing-hero-body {
    position: relative;
    min-height: 80vh;
    background-color: #ffffff;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    overflow: hidden;
    background-image: url(/drop.png) !important;
    background-size: cover;
    background-position: center center;
  }
  .landing-hero-content {
    padding: 0px;
    font-size: 14px;
    position: relative;
    margin: auto;
    z-index: 99;
  }

  .landing-hero-header {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      270deg,
      rgb(6, 12, 30) 0%,
      rgb(11, 21, 50) 8%,
      rgb(20, 39, 94) 16.5%,
      rgb(33, 64, 151) 28.5%,
      rgb(44, 83, 197) 40.5%,
      rgb(50.24, 96.11, 228.83) 46.43%,
      rgb(54, 104, 248) 50%,
      rgb(44.23, 83.49, 196.56) 59%,
      rgb(33.32, 63.62, 150.87) 68.5%,
      rgb(20.26, 39.14, 93.5) 79%,
      rgb(10.82, 20.9, 49.94) 88.5%,
      rgb(6.45, 12.45, 29.75) 97.5%
    );
    background-clip: text;
    color: transparent;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
  }
  .drop-shadow {
    box-shadow: 0px 10px 20px rgba(147, 191, 251, 0.19) inset;
  }
  .wrapper-landing {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    filter: blur(50px);
  }
  .gradient-btn {
    vertical-align: middle;
    display: flex;
    align-items: center;
    margin: auto !important;
    margin-top: 2em !important;
    border-radius: 35px !important;
    background: linear-gradient(
      74deg,
      rgba(5, 25, 55, 1) 0%,
      rgba(30, 59, 143, 1) 25%,
      rgba(54, 104, 248, 1) 50%,
      rgba(88, 157, 251, 1) 75%,
      rgba(88, 157, 251, 1) 100%
    );
    font-weight: 300 !important;
  }

  .landing-hero-body {
    text-align: center;
  }
  .landing-hero-par {
    margin-top: 2em !important;
    color: black;
    font-weight: 300;
    font-family: "Poppins", sans-serif;
  }
  .topLefttImgHero {
    position: absolute;
    left: 120px;
    top: 70px;
  }
  .topRightImgHero {
    position: absolute;
    right: 8rem;
    top: 5rem;
    height: 180px;
  }
  .bottomRightImgHero {
    position: absolute;
    right: 20px;
    bottom: 30px;
  }
  .bottomLeftImgHero {
    position: absolute;
    bottom: 0;
    left: 20px;
    width: 400px;
  }

  .landing-body {
    background: linear-gradient(
      90deg,
      rgb(51, 102, 245) 0%,
      rgb(158.31, 183.73, 255) 100%
    );
    height: 300px;
    position: relative;
    color: white;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
    justify-content: flex-start;
  }
  .landing-b-header {
    font-size: 2rem;
    font-weight: bold;
    font-family: "Montserrat", Helvetica;
  }
  .landing-b-sub {
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
  }
  .landing-sub {
    /* height: 700px; */
  }
  .backgroundcontainer {
    width: 70vw;
    height: 100%;
    position: relative;
    margin: auto;
  }
  .calendarnewone {
    position: relative;
    width: 100%;
  }

  .backgroundimage {
    position: relative;
    background-image: url(/calendar.svg) !important;
    background-size: cover;
    background-position: center center;
    width: 90vw;
  }
  .backgroundPrimary {
    width: 100%;
  }
  .backgroundlanding {
    margin: auto;
    position: relative;
    width: 50%;
    height: 500px;
    transform: translateY(-25%);
    background-position: center;
    display: flex;
    max-height: 100%;
    max-width: 100%;
    z-index: 1;
  }
  .calendaricon1 {
    width: fit-content;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 0px;
    width: 300px;
    z-index: 99;
  }
  .calendaricon2 {
    width: fit-content;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 300px;
  }
  .calendarnewtwo {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .landing-footer {
    background: linear-gradient(
      90deg,
      rgb(51, 102, 245) 0%,
      rgb(158.31, 183.73, 255) 100%
    );
    height: 300px;
    position: relative;
    color: white;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .footerbtn {
    margin: 0 !important;
    padding: 0.3rem 1rem !important;
  }
  @media (max-width: 768px) {
    :root {
      font-size: 10px;
    }
    .landing-b-header {
      text-align: center;
      padding: 0rem 2rem;
      font-size: 1.7rem;
    }
    .landing-hero-header {
      font-size: 1.7rem;
    }
    .landing-body {
      text-align: center;
    }
    .landing-hero-body {
      min-height: 40vh;
    }
    .landing-hero-content {
      padding: 20px;
    }
    .bottomLeftImgHero,
    .topRightImgHero,
    .bottomRightImgHero,
    .topLefttImgHero {
      display: none;
    }

    .topLefttImgHero {
      top: 10px;
    }
    .bottomRightImgHero {
      bottom: 0px;
    }
    .backgroundcontainer {
      width: 40vw;
    }
    .calendaricon1,
    .calendaricon2 {
      display: none;
    }
    .backgroundlanding {
      margin-top: 2rem;
      height: fit-content;
      width: 100%;
      overflow: hidden;
    }
  }
`;

export default Wrapper;
