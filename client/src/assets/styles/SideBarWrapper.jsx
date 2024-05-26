import styled from "styled-components";
const Wrapper = styled.section`
  width: 100px;
  height: 95vh;
  position: relative;
  background-color: #161a1d;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  #heading {
    font-size: 20px;
    /* color: #d3e763; */
    color: #3668f8;
    text-align: center;
    cursor: pointer;
    font-family: "poppins-regular", sans-serif;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin-bottom: 50px;
    cursor: pointer;
  }

  a {
    color: #ffffff;
    font-size: 18px;
    padding: 10px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -ms-border-radius: 12px;
    -o-border-radius: 12px;
    display: flex;
    background-color: transparent;
  }

  .logout-icon {
    cursor: pointer;
    justify-content: center;
    margin: auto;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    display: flex;
  }

  a:hover {
    background-color: #589dfb;
    color: #ffffff;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    height: fit-content;
    padding: 0rem;
    justify-content: center;
    align-items: center;
    width: 95% !important;
    margin: 0px auto !important;
    background-color: #000000 !important;

    .sidebar-left-column {
      position: fixed;
      bottom: 0;
      z-index: 99;
      width: 90%;
      background-color: #161a1d;
      border-radius: 20px;
      margin-top: 0rem;
    }
    #heading,
    .logoutContainer {
      display: none;
    }
    .sidebarBody {
      display: flex;
    }
  }
`;

export default Wrapper;
