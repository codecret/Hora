import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
const initialState = {
  search: "",
  appointmentStatusOptions: ["Scheduled", "Canceled", "Completed"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = ({ name, value }) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
