import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderUserStyles = styled.div`
	min-height: 100vh;
	padding: 30px;
	.logo {
		width: 370px;
		height: auto;
		margin: 0 auto 20px;
	}
	.heading {
		text-align: center;
		color: ${(props) => props.theme.primary};
		font-weight: bold;
		font-size: 30px;
		margin-bottom: 20px;
	}
	.form {
		max-width: 550px;
		margin: 0 auto;
	}
`;

import { ReactNode } from "react";

const HeaderUser = ({ children }: { children: ReactNode }) => {
	return (
		<HeaderUserStyles>
			<div className="container">
				<div className="text-center">
					<NavLink to="/" className="inline-block">
						<img
							srcSet="/public/logo.png"
							alt="VNext Sosical"
							className="logo"
						/>
					</NavLink>
				</div>
				<h2 className="heading">VNext Sosical</h2>
				{children}
			</div>
		</HeaderUserStyles>
	);
};

export default HeaderUser;
