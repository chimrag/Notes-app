import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Home page */}
        <Route path="/" element={<HomePage />} />

        {/* 👇 Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;