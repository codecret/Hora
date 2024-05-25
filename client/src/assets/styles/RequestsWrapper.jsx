import styled from "styled-components";
const Wrapper = styled.section`
  margin-top: 0.5rem;
  width: 100%;

  .requestPageTitle {
    margin: 0.5rem;
    margin-top: 2rem;
  }
  .requestPageDesc {
    margin: 0.5rem !important;
    color: var(--grey-300);
  }
  .requestTaskProject {
    text-transform: capitalize;
    font-weight: 300;
    display: inline-flex;
    color: var(--grey-300);
  }
  .cardsContainer {
    max-width: 100%;
    max-height: 72vh;
    overflow-y: scroll;
    border-radius: 5px;
    background-color: white;
    scroll-behavior: smooth;
  }
  .cardsParent {
    padding: 1rem 0rem;
    margin: 0rem 2rem;
  }
  .card {
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 1rem;
    box-shadow: rgba(0, 0, 0, 0.06) -2px -3px 20px 3px;
  }
  .requestButtonsContainer {
    display: flex;
    gap: 10px !important;
  }

  //requests
  .requestTaskTitle {
    font-size: 2rem;
  }
  .requestTaskOwner,
  .requestCreatedAt,
  .requestButtonsContainer {
    color: var(--grey-100);
  }
  .typeedit {
    font-size: 0.7rem;
  }
  .typeedit,
  .rejectBtn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  .rejectBtn {
    background: #fb6c58 !important;
  }
  .userContainerFlex {
    margin: 1rem 0rem;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  @media (max-width: 768px) {
    .requestButtonsContainer {
      flex-direction: column;
    }
  }
`;

export default Wrapper;
