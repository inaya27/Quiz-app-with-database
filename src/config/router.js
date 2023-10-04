import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Admin from "../pages/admin";
import Student from "../pages/student";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="student" element={<Student />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
