import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";


export function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.type === "admin") {
        navigate("/dashboard/admin-panel"); // or wherever your admin dashboard is
      } else {
        navigate("/"); // regular user dashboard
      }
    }
  }, [currentUser, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before submit

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Success: redirect to dashboard/home
      navigate("/");
    } catch (err) {
      // Show error message on failure
      setError("Invalid email or password. Please try again.");
    }
  };


  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Link to="/" className="text-black hover:text-purple-300 transition-colors duration-300 px-3 font-bold">
            <Typography variant="h1" className="font-bold">AI Images</Typography>
          </Link>
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Show error message if any */}
          {error && (
            <Typography variant="small" color="red" className="mb-4">
              {error}
            </Typography>
          )}

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            You have Not account?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Sign up</Link>
          </Typography>
          {/* rest of your existing buttons and links remain unchanged */}

        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section >
  );
}

export default SignIn;
