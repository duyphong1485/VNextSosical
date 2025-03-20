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
  .have-account {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top : 20px;
    font-size: 16px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
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
							alt="VNext Social"
							className="logo"
						/>
					</NavLink>
				</div>
				<h2 className="heading">VNext Socical</h2>
				{children}
			</div>
		</HeaderUserStyles>
	);
};

export default HeaderUser;
