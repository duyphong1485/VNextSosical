import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { LoadingSpinner } from "../components/loading";
import { IconEyeClose, IconEyeOpen } from "../components/icon";

const SignUpPageStyles = styled.div`
	min-height: 100vh;
	padding: 20px;
	.logo {
		width: 400px;
		height: 200px;
		margin: 0 auto 20px;
	}
	.heading {
		text-align: center;
		color: ${(props) => props.theme.primary};
		font-weight: bold;
		font-size: 36px;
	}
	.form {
		max-width: 600px;
		margin: 0 auto;
	}
`;

const SignUpPage = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		watch,
		reset,
	} = useForm({
		mode: "onChange",
	});
	const handleSignUp = (values) => {
		if (!isValid) return;
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(undefined);
			}, 3000);
		});
	};
	const [togglePassword, setTogglePassword] = useState(false);
	return (
		<SignUpPageStyles>
			<div className="container">
				<img srcSet="/public/logo.png" alt="Vnext-Sosical" className="logo" />
				<h2 className="heading">VNext Sosical</h2>
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
							children={undefined}
						></Input>
					</Field>
					<Field>
						<Label htmlFor="fullname">Day of birth</Label>
						<Input
							placeholder="Plesae enter your day of birth"
							control={control}
							name="dob"
							type="date"
							children={undefined}
						></Input>
					</Field>
					<Field>
						<Label htmlFor="email">Email address</Label>
						<Input
							type="email"
							placeholder="Enter your Email"
							control={control}
							name="email"
							children={undefined}
						></Input>
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
								<IconEyeClose
									onClick={() => setTogglePassword(true)}
								></IconEyeClose>
							) : (
								<IconEyeOpen
									onClick={() => setTogglePassword(false)}
								></IconEyeOpen>
							)}
						</Input>
					</Field>
					<Field>
						<Label htmlFor="password">Password again</Label>
						<Input
							type={togglePassword ? "text" : "password-again"}
							name="password-again"
							placeholder="Enter your password again"
							control={control}
						>
							{!togglePassword ? (
								<IconEyeClose
									onClick={() => setTogglePassword(true)}
								></IconEyeClose>
							) : (
								<IconEyeOpen
									onClick={() => setTogglePassword(false)}
								></IconEyeOpen>
							)}
						</Input>
					</Field>
					<div style={{ textAlign: "center" }}>
						<Button
							type="submit"
							style={{
								width: "100%",
								maxWidth: "350px",
								margin: "0 auto",
							}}
							isLoading={isSubmitting}
							disabled={isSubmitting}
						>
							Sign Up
						</Button>
					</div>
				</form>
			</div>
		</SignUpPageStyles>
	);
};

export default SignUpPage;
