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
