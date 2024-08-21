import React, { createContext, useState, useContext, ReactNode } from "react";

type GlobalState = {
  weather: string | null;
  flights: string | null;
  hotels: string | null;
  fromLocation: string | null;
  toLocation: string | null;
  fromDate: Date | null;
  toDate: Date | null;
};

const defaultState: {
  state: GlobalState;
  setGlobalState: (newState: Partial<GlobalState>) => void;
  resetGlobalState: () => void;
} = {
  state: {
    weather: null,
    flights: null,
    hotels: null,
    fromLocation: null,
    toLocation: null,
    fromDate: null,
    toDate: null,
  },
  setGlobalState: () => {},
  resetGlobalState: () => {},
};

const GlobalStateContext = createContext(defaultState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>(defaultState.state);

  const setGlobalState = (newState: Partial<GlobalState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const resetGlobalState = () => {
    setState({
      weather: null,
      flights: null,
      hotels: null,
      fromLocation: null,
      toLocation: null,
      fromDate: null,
      toDate: null,
    });
  };

  return (
    <GlobalStateContext.Provider
      value={{ state, setGlobalState, resetGlobalState }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
