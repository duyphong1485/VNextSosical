import React from "react";
import styled from "styled-components";
import { ReactNode } from "react";
const FieldStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 20px;
	margin-bottom: 40px;
	&:last-child {
		margin-bottom: 0;
	}
`;


const Field = ({ children }: { children: ReactNode }) => {
	return <FieldStyles>{children}</FieldStyles>;
};

export default Field;
