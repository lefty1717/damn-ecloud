// React context Api

import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// children => <App />
//hook which allows us to pull information from the data
export const useStateValue = () => useContext(StateContext);