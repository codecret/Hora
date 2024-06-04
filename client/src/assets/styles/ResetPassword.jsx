import styled from "styled-components";
const Wrapper = styled.section`
  .centerContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 30%; */
    margin: auto;
    text-align: center;
    padding: 3rem;
    /* height: 50%; */
    background-color: #ffffff;
    border-radius: 20px;
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
  }
  .loginBtn {
    background-color: #589dfb;
    width: 100%;
    padding: 0.7rem 0.4rem;
    font-weight: 800;
    color: white;
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
  .right-container-forget-password {
    padding: 7rem;
    position: relative;
    border-radius: 50px;
    width: 100%;
    background-color: #f0f0f0;
  }
  .forgetContainer {
    width: 100%;
    height: 100%;
    background-image: url("/resetpassword.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center; /* height: 100%; */
    /* padding: 3rem; */
    position: relative;
    border-radius: 50px;
  }
  .left-container h3 {
    font-size: 26px;
  }
`;

export default Wrapper;
