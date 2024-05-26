import styled from "styled-components";
const Wrapper = styled.section`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  .card-leftside {
    float: left;
    width: 40%;
    height: 100%;
    background-color: #589dfb;
    border-radius: 10px 0px 0px 10px;
    -webkit-border-radius: 10px 0px 0px 10px;
    -moz-border-radius: 10px 0px 0px 10px;
    -ms-border-radius: 10px 0px 0px 10px;
    -o-border-radius: 10px 0px 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
  }

  .card-rightside {
    float: right;
    width: 60%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 0px 10px 10px 0px;
    -webkit-border-radius: 0px 10px 10px 0px;
    -moz-border-radius: 0px 10px 10px 0px;
    -ms-border-radius: 0px 10px 10px 0px;
    -o-border-radius: 0px 10px 10px 0px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    position: relative;
    overflow: hidden;
  }

  .appointment-title {
    font-size: 18px;
    font-family: "poppins-regular", sans-serif;
    margin-bottom: 15px;
    color: #f8f8f8;
  }
  .appointment-date,
  .appointment-time {
    font-family: "poppins-regular", sans-serif;
    font-size: 12px;
    margin-bottom: 10px;
    color: #f8f8f8;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .appointment-name {
    font-family: "poppins-semibold", sans-serif;
    font-size: 16px;
    margin-bottom: 10px;
    color: black;
    overflow: hidden;
    display: -webkit-box;
    text-wrap: wrap;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .appointment-description {
    font-family: "poppins-regular", sans-serif;
    font-size: 12px;
    margin-bottom: 5px;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

export default Wrapper;
