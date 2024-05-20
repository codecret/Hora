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
