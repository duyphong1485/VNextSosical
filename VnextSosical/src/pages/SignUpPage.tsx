import { useState } from "react";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import HeaderUser from "./HeaderUser";
import axios from "axios";

interface BackendErrors {
  [key: string]: string[];
}

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // State lưu lỗi trả về từ backend
  const [backendErrors, setBackendErrors] = useState<BackendErrors | null>(null);

  const handleSignUp = async (values: any) => {
    // Reset lỗi BE trước khi gửi
    setBackendErrors(null);
    if (!isValid) return;
    if (values.password !== values.password_again) {
      setBackendErrors({ password: ["Password is not equal"] });
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: values.username,
        date_of_birth: values.dob,
        email: values.email,
        password: values.password,
        password_again: values.password_again,
      });
      console.log("suscess", response.data);
    } catch (error: any) {
      if (error.response) {
        setBackendErrors(error.response.data);
        console.error("error:", error.response.data);
      } else {
        console.error("erorr:", error.message);
      }
    }
  };

  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePasswordAgain, setTogglePasswordAgain] = useState(false);

  return (
    <HeaderUser>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username">User name</Label>
          <Input
            placeholder="Enter your user name"
            control={control}
            name="username"
            type="text"
          />
          {backendErrors?.username && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {backendErrors.username.join(", ")}
            </div>
          )}
        </Field>
        <Field>
          <Label htmlFor="dob">Day of birth</Label>
          <Input
            placeholder="Please enter your day of birth"
            control={control}
            name="dob"
            type="date"
          />
          {backendErrors?.date_of_birth && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {backendErrors.date_of_birth.join(", ")}
            </div>
          )}
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            placeholder="Enter your Email"
            control={control}
            name="email"
          />
          {backendErrors?.email && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {backendErrors.email.join(", ")}
            </div>
          )}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose onClick={() => setTogglePassword(true)} />
            ) : (
              <IconEyeOpen onClick={() => setTogglePassword(false)} />
            )}
          </Input>
          {backendErrors?.password && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {backendErrors.password.join(", ")}
            </div>
          )}
        </Field>
        <Field>
          <Label htmlFor="password_again">Password again</Label>
          <Input
            type={togglePasswordAgain ? "text" : "password"}
            name="password_again"
            placeholder="Enter your password again"
            control={control}
          >
            {!togglePasswordAgain ? (
              <IconEyeClose onClick={() => setTogglePasswordAgain(true)} />
            ) : (
              <IconEyeOpen onClick={() => setTogglePasswordAgain(false)} />
            )}
          </Input>
          {backendErrors?.password_again && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {backendErrors.password_again.join(", ")}
            </div>
          )}
        </Field>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign Up
        </Button>
        {backendErrors && !Object.keys(backendErrors).length && (
          <div style={{ color: "red", marginTop: "10px" }}>
            Đã xảy ra lỗi, vui lòng kiểm tra lại thông tin.
          </div>
        )}
      </form>
    </HeaderUser>
  );
};

export default SignUpPage;
