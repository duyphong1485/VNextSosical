import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
	color: ${(props) => props.theme.grayDark};
	font-weight: 600;
	cursor: pointer;
`;

const Label: React.FC<LabelProps> = ({ htmlFor = "", children, ...props }) => {
	return (
		<LabelStyles htmlFor={htmlFor} {...props}>
			{children}
		</LabelStyles>
	);
};

interface LabelProps {
	htmlFor?: string;
	children: React.ReactNode;
	[key: string]: any;
}


export default Label;
