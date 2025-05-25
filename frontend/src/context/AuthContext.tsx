import { createContext, useContext } from "react";

// Define the Role type
type Role = "admin" | "user";

// Define the User type (you can expand this based on your needs)
interface User {
  username: string;
  profilePicture?: string;
}

// Extend the AuthContextType to include user
interface AuthContextType {
  role: Role;
  user: User | null; // user is either a User object or null if not logged in
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  role: "user",
  user: null, // Default user is null
});

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider to wrap your app and provide context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockRole: Role = "admin"; // Set the default role
  const mockUser: User = {
    username: "Naveen",
    profilePicture: "/images/n", // Optional user profile picture
  };

  // Providing role and user in context
  return (
    <AuthContext.Provider value={{ role: mockRole, user: mockUser }}>
      {children}
    </AuthContext.Provider>
  );
};
