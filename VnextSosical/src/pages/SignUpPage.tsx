import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import HeaderUser from "./HeaderUser";


const SignUpPage = () => {
	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
	} = useForm({
		mode: "onChange",
	});

	const handleSignUp = (_values: any) => {
		if (!isValid) return;
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(undefined);
			}, 3000);
		});
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
						<Label htmlFor="fullname">Fullname</Label>
						<Input
							placeholder="Enter your full name"
							control={control}
							name="fullname"
							type="text"
						/>
					</Field>
					<Field>
						<Label htmlFor="dob">Day of birth</Label>
						<Input
							placeholder="Please enter your day of birth"
							control={control}
							name="dob"
							type="date"
						/>
					</Field>
					<Field>
						<Label htmlFor="email">Email address</Label>
						<Input
							type="email"
							placeholder="Enter your Email"
							control={control}
							name="email"
						/>
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
					</Field>
					<Field>
						<Label htmlFor="password-again">Password again</Label>
						<Input
							type={togglePasswordAgain ? "text" : "password"}
							name="password-again"
							placeholder="Enter your password again"
							control={control}
						>
							{!togglePasswordAgain ? (
								<IconEyeClose onClick={() => setTogglePasswordAgain(true)} />
							) : (
								<IconEyeOpen onClick={() => setTogglePasswordAgain(false)} />
							)}
						</Input>
					</Field>
						<Button
							type= "submit"
							isLoading={isSubmitting}
							disabled={isSubmitting}
						>
							Sign Up
						</Button>
				</form>
		</HeaderUser>
	);
};

export default SignUpPage;
