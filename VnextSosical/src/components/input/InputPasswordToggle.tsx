import { IconEyeClose, IconEyeOpen } from "../icon";
import React, { Fragment, useState } from "react";
import Input from "./Input";

interface InputPasswordToggleProps {
  control: any;
  name?: string;
  type?: string;
}

const InputPasswordToggle = ({ control }: InputPasswordToggleProps) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
