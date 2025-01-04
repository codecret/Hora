import styled from "styled-components";
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0p;
  margin-top: 20px;
  height: 100%;
  overflow: hidden;

  .dashboard-right-column {
    width: 85vw;
    max-height: 100vh;
    margin-left: 20px;
    overflow: hidden;
  }

  .appointment-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    height: 80vh;
    align-items: center;
    scrollbar-gutter: stable;
    padding: 0rem 1rem;
    overflow-y: hidden;
  }

  .appointment-list:hover {
    overflow-y: scroll;
  }

  .appointment-list::-webkit-scrollbar {
    width: 5px;
  }

  .appointment-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
  }

  .appointment-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .appointment-list-heading {
    font-size: 18px;
    font-family: "poppins-regular", sans-serif;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #000000;
  }
  .top-row {
    display: flex;
    justify-content: center;
  }
  .piechart {
    margin: auto;
    width: 250px;
    transform: translateX(15%);
    display: flex;
    justify-content: center;
  }
  .custom-chart .muix-axis-direction-x .muix-axis-line,
  .custom-chart .muix-axis-direction-x .muix-axis-ticks,
  .custom-chart .muix-axis-direction-x .muix-axis-labels,
  .css-1k2u9zb-MuiChartsAxis-root .MuiChartsAxis-line,
  .css-1k2u9zb-MuiChartsAxis-root .MuiChartsAxis-tick {
    stroke: white !important;
  }
  .right-column {
    /* display: grid;
    grid-template-rows: 1fr 1fr; */
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    max-height: 80vh;
  }

  .top-row,
  .bottom-row {
    background-color: white;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bottom-row,
  .top-row {
    height: 50%;
    flex: 1;
  }
  .container-bottom-row {
    border-radius: 20px;
    width: 100%;
    background-color: var(--primary-color);
    padding: 1rem;
    height: 100%;
  }

  .chartLabel {
    padding: 0.7rem 2rem;
    border-radius: 20px;
    text-align: center;
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    font-weight: 700;
  }
  .white-bg {
    background-color: white !important;
    color: black !important;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0p;
    margin-top: 20px;
    margin-bottom: 7rem;

    .dashboard-container {
      grid-template-columns: 1fr;
    }
    .headingContainer,
    .logoutContainer {
      display: none;
    }
    .sidebarBody {
      width: 100%;
      justify-content: space-around;
      margin: 0px;
      padding: 0px;
    }
    .dashboard-right-column {
      width: auto;
      margin-left: 0rem;
      padding: 0rem 2rem;
    }
    .right-column {
      margin-top: 1rem;
    }
    .left-column {
      padding: 1rem 0rem;
    }
    .appointment-list {
      padding: 1rem 1rem;
      height: fit-content;
    }
    .appointment-list,
    .bottom-row {
      min-height: 15rem;
    }
    .top-row {
      height: 100%;
    }
    .bottom-row {
      height: 100%;
    }
  }
  @media (max-width: 768px) {
    height: auto;

    .sidebar {
      width: 95% !important;
      margin: 0px auto !important;
      background-color: #000000 !important;
    }
  }
`;

export default Wrapper;
