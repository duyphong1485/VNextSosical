import  { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { InputPasswordToggle } from "../components/input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import HeaderUser from "./HeaderUser";
import { LogoSNS } from "../components/logoSNS";
import { Toast } from "../components/errors";

interface SignInFormData {
  username: string;
  password: string;
}

interface BackendErrors {
  [key: string]: string[];
}

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string>("");

  const handleSignIn = async (data: SignInFormData) => {
    setBackendError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        const errorData: BackendErrors = error.response.data;
        if (errorData) {
          Object.keys(errorData).forEach((field) => {
            if (field !== "non_field_errors") {
              setError(field as keyof SignInFormData, {
                type: "server",
                message: errorData[field][0],
              });
            }
          });
          // Xử lý lỗi chung nếu có non_field_errors
          if (errorData.non_field_errors) {
            setBackendError(errorData.non_field_errors.join(", "));
          }
        }
      } else {
        setBackendError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <HeaderUser>
      <form className="form" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
        {/* Hiển thị toast nếu có lỗi chung */}
        {backendError && <Toast message={backendError} />}

        <Field>
          <Label htmlFor="username">User name</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your user name"
            control={control}
          />
          {errors.username && (
            <div style={{ color: "red", fontSize: "14px" }}  >{errors.username.message}</div>
          )}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control} name="password" />
          {errors.password && (
            <div style={{ color: "red", fontSize: "14px" }}>{errors.password.message}</div>
          )}
        </Field>

        <div className="text-right mb-1">
          <NavLink
            to="/forgot-password"
            className="mr-2 italic text-blue-500 text-sm hover:underline"
          >
            Forgot your password?
          </NavLink>
        </div>
        <LogoSNS />
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Login
        </Button>
      </form>
      <div className="have-account text-center mt-10">
        Don’t have an account?{" "}
        <NavLink to="/sign-up" className="text-blue-500 hover:underline">
          Register
        </NavLink>
      </div>
    </HeaderUser>
  );
};

export default SignInPage;
