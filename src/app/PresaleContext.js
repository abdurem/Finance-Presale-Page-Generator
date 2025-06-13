"use client";
import { createContext, useContext, useState } from "react";

const PresaleContext = createContext();

export function PresaleProvider({ children }) {
  const [presale, setPresale] = useState(null);
  return (
    <PresaleContext.Provider value={{ presale, setPresale }}>
      {children}
    </PresaleContext.Provider>
  );
}

export function usePresale() {
  return useContext(PresaleContext);
}
