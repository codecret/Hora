import styled from "styled-components";
const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a9c1ff;

  .login-input {
    border: none;
    margin: 0.3rem 0rem;
    padding-top: 0.6rem !important;
    padding-bottom: 0.6rem !important;
    width: 100%;
    border: 1px solid #cbd5e1;
  }
  .inputDiv {
    width: 100%;
    margin: 0.5rem 0rem;
  }
  .sub-title {
    font-family: 700;
    font-size: 15px;
    color: var(--grey-600);
  }
  .login-container {
    width: 90%;
    height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100%;
    background-color: white;
    border-radius: 10px;
    outline: none;
    border-radius: 50px;
  }
  .container-full-width-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  h2 {
    font-size: 2rem;
    font-weight: 900;
  }
  .labelStyle {
    display: block;
    font-size: var(--small-text);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
  .loginBtn {
    background-color: #589dfb;
    width: 100%;
    padding: 0.7rem 0.4rem;
    font-weight: 800;
    color: white;
  }
  .right-container {
    background-image: url("/background.png");
    background-size: cover;
    background-position: center;
    height: 100%;
    position: relative;
    border-radius: 50px;
  }

  .items {
    height: 100%;
  }
  .left-container {
    padding: 3rem 6rem;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 50px;
    text-align: left;
    overflow: auto;
  }
  .member-btn {
    background-color: transparent;
    margin-left: 0.3rem;
    border: none;
  }
  .notmember {
    letter-spacing: var(--letter-spacing);
    margin-top: 0.3rem;
    font-weight: 500;
    color: var(--grey-300);
  }
  .login-lower {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .notmember,
  .member-btn {
    font-size: 13px;
  }
  .forgotText {
    /* position: absolute;
  top: 30px;
  right: 0; */
    text-decoration: none;
    color: rgb(84, 82, 82);
    font-size: 13px;
  }
  .name {
    text-transform: capitalize;
  }
  .userIcon {
    color: black;
  }
  .userContainer {
    border-radius: 50%;
    width: 3rem;
    width: 3rem;
  }
  @media (max-width: 768px) {
    .login-container {
      grid-template-columns: 1fr;
    }
    .left-container {
      padding: 0rem 2rem;
    }
    .right-container {
      display: none;
    }
  }
`;

export default Wrapper;
