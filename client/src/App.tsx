import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistrationPage } from "./features/registration/RegistrationPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
