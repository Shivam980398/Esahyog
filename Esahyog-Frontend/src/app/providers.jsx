import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../features/auth/AuthProvider";
import { LocationProvider } from "../context/LocationProvider";

export const AppProviders = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <LocationProvider>{children}</LocationProvider>
    </AuthProvider>
  </BrowserRouter>
);
