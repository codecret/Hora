import styled from "styled-components";
const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #eaeaea;
  height: 100vh;

  .searchAppointment {
    border-radius: 4px;
    padding: 1rem;
    border: 0.5px solid #b7b7b7;
    outline: none;
  }
  .borderedDiv {
    border-radius: 5px;
    border: 0.5px solid #b7b7b7;
    background-color: rgba(217, 217, 217, 0.435);
    padding: 0.3rem;
    min-height: 40px;
  }
  .search-list {
    background-color: transparent;
    margin-top: 20px !important;
    padding: 0rem;
    height: calc(100vh - 120px);
  }
  .topColumns {
    margin-top: 2rem;
  }
`;

export default Wrapper;
