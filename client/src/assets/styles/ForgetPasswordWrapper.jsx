import styled from "styled-components";
const Wrapper = styled.section`
  .forgetPasswordBtn {
    border-radius: 0px !important;
  }
  .labelStyle {
    font-size: 12px;
  }
  .forgotText {
    font-size: 30px;
    font-weight: 700;
    color: black;
  }

  .right-container-forget-password {
    padding: 3rem;
    position: relative;
    border-radius: 50px;
    width: 100%;
    background-color: #f0f0f0;
  }
  .forgetContainer {
    width: 100%;
    height: 100%;
    background-image: url("/forgetPasswordImage.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center; /* height: 100%; */
    /* padding: 3rem; */
    position: relative;
    border-radius: 50px;
  }
  .loginBtn {
    background-color: #589dfb;
    width: 100%;
    padding: 0.7rem 0.4rem;
    font-weight: 800;
    color: white;
  }
  .sub-title {
    color: #656565;
  }
  .inputDiv {
    width: 100%;
  }
  .imagesentcontainer {
    width: 100%;
    height: 80vh;
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
  .imagecontainercontent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: auto;
    height: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 20px;
  }
  .imagecontainercontent h3 {
    font-size: 37px;
    text-align: center;
  }
  .imagecontainercontent p {
    color: #505050;
  }
`;

export default Wrapper;
