import styled from "styled-components";
const Wrapper = styled.section`
  margin: 2rem 0rem;
  background-color: white;
  padding: 3rem;
  border-radius: 20px;

  .sectionPadding {
    margin: 2rem 0rem;
    background-color: white;
    padding: 3rem;
    border-radius: 20px;
  }
  .btnContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .topContainer {
    display: flex;
    gap: 3rem;
    align-items: center;
  }
  .bodyContainer {
    position: relative;
    margin: 2rem 0rem;
    background-color: #ffffff;
    padding: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 1px 32.900001525878906px rgba(0, 0, 0, 0.058));
    border-radius: 15px;
  }
  .s-bodyHeader {
    font-size: 1.3rem;
  }
  .changepasswordtext {
    font-size: 1rem;
  }
  .image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
  .wholeContainer {
    display: flex;
    justify-content: space-between;
  }
  .leftContainer {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
  .rightContainer {
    position: relative;
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  .secBtn {
    display: flex;
    align-items: center;
    padding-right: 3rem !important;
    padding-left: 3rem !important;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.15) !important;
  }
  .customInput {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    padding: 0.5rem 1rem !important;
    border-radius: 5px;
  }
  .absoluteBtn {
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
  .passwordChange {
    margin-top: 0.5rem;
  }
  .change-pic-btn {
    font-size: 12px !important;
    font-weight: 500 !important;
  }
  @media (max-width: 768px) {
    .topContainer,
    .wholeContainer {
      flex-direction: column;
    }
    .leftContainer,
    .rightContainer {
      width: 100%;
    }
    .absoluteBtn {
      position: relative;
      display: block;
      right: 0px;
    }
    .rightContainer {
      display: flex;
      justify-content: center;
      margin: 1rem 0rem;
    }
    .change-pic-btn {
      font-size: 12px !important;
    }
  }
`;

export default Wrapper;
