import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function UsersRoute({ children }) {
     const { currentUser } = useAuth();

     // If no user logged in, redirect to sign-in page
     if (!currentUser) {
          return <Navigate to="/sign-in" replace />;
     }

     // If user is not admin, redirect to dashboard gallery
     if (currentUser.type !== "admin") {
          return <Navigate to="/dashboard/gallery" replace />;
     }

     // If admin, render children (the protected admin page)
     return children;
}
