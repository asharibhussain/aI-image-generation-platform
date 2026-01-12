import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export default function PublicRoute({ children }) {
     const { currentUser } = useContext(AuthContext);

     if (currentUser) {
          // Redirect authenticated users to dashboard or home
          return <Navigate to="/dashboard/gallery" replace />;
     }

     return children;
}