import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role: "admin" | "user";
}

export default function RoleGuard({ children, role }: Props) {
  const { role: userRole } = useAuth();
  return userRole === role ? <>{children}</> : <Navigate to="/home" />;
}
