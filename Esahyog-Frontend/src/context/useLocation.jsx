import { useContext } from "react";
import { LocationContext } from "./LocationContext";
export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used inside a LocationProvider");
  }

  return context;
}
