import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { role, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
    <div className="max-w-screen-xl mx-auto relative flex items-center justify-between">
      
      {/* Invisible spacer to keep space on the left */}
      <div className="w-12"></div>
  
      {/* Centered Title */}
      <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900 dark:text-white">
        annam.ai
      </h1>
  
      {/* User Profile */}
      <div className="relative">
        <Button variant="ghost" className="p-0" onClick={toggleDropdown}>
          <Avatar>
            <AvatarImage
              src={user?.profilePicture || "/default-profile.png"}
              alt="User Avatar"
            />
            <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
  
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-600">
            <div className="p-3">
              <div className="font-semibold text-gray-800 dark:text-white">{user?.username}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-gray-700 dark:text-white"
                onClick={() => alert("Logout clicked")}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
  
  );
}
