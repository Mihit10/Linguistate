import React, { useState } from "react";
// import { GoogleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const BrokerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt", { email, password });
    navigate("/bdash"); // Redirect to broker dashboard
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: "#F5F7FA",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%232D89FF' fill-opacity='0.3' d='M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,192C672,171,768,149,864,154.7C960,160,1056,192,1152,202.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      />

      <Card
        className="w-full max-w-md z-10 shadow-2xl rounded-2xl overflow-hidden"
        style={{ backgroundColor: "white", border: "1px solid #2D89FF1A" }}
      >
        <CardHeader
          className="text-center p-6 pb-0"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <CardTitle
            className="text-3xl font-bold mb-2"
            style={{ color: "#2D89FF" }}
          >
            Broker Login
          </CardTitle>
          <p className="text-sm" style={{ color: "#333333" }}>
            Access your real estate management platform
          </p>
        </CardHeader>

        <CardContent className="p-6 pt-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "#333333" }}
              >
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "#333333" }}
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
                required
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm"
                style={{ color: "#2D89FF", textDecoration: "none" }}
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full"
              style={{
                backgroundColor: "#2D89FF",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center my-4">
            <div
              className="flex-grow border-t"
              style={{ borderColor: "#33333333" }}
            />
            <span className="px-4 text-sm" style={{ color: "#333333" }}>
              OR
            </span>
            <div
              className="flex-grow border-t"
              style={{ borderColor: "#33333333" }}
            />
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full flex items-center justify-center"
            style={{ borderColor: "#2D89FF", color: "#2D89FF" }}
            onClick={handleGoogleLogin}
          >
            {/* <GoogleIcon className="mr-2" size={20} /> */}
            Sign In with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerLogin;
