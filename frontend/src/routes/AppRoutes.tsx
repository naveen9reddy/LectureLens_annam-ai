import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import CreateQuiz from "@/pages/CreateQuiz";
import QuizDetails from "@/pages/QuizDetails";
import RoleGuard from "@/components/shared/RoleGuard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={
        <RoleGuard role="admin">
          <CreateQuiz />
        </RoleGuard>
      } />
      <Route path="/quiz/:id" element={<QuizDetails />} />
    </Routes>
  );
}
