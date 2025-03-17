import { string } from "prop-types";
import { LoadingSpinner } from "../loading";
import React from "react";
import styled, { css } from "styled-components";
interface ButtonStyleProps {
	height?: string;
	buttonType?: string;
}

const ButtonStyles = styled.button<ButtonStyleProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 25px;
	color: white;
	border-radius: 8px;
	background-color: ${(props) => props.theme.primary};
	cursor: pointer;
	font-weight: 600;
	font-size: 18px;
	line-height: 1;
	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
	height: ${(props) => props.height || "70px"};
	${(props) =>
		props.buttonType === "primary" &&
		css`
			background-image: linear-gradient(
				to right bottom,
				${(props) => props.theme.primary},
				${(props) => props.theme.secondary}
			);
		`};
`;

const Button: React.FC<ButtonProps> = ({
	children,
	buttonType = "primary",
	onClick = () => {},
	...props
}) => {
	const { isLoading } = props;
	const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
	return (
		<ButtonStyles buttonType={buttonType} onClick={onClick} style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }} {...props}>
			{child}
		</ButtonStyles>
	);
};
interface ButtonProps extends ButtonStyleProps {
	children: React.ReactNode;
	buttonType?: string;
	onClick?: () => void;
	isLoading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";


}

export default Button;
