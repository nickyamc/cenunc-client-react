import React from "react";
import { useRouteError } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const Error404: React.FC = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<>
			<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
				<Title>Error 404</Title>
			</div>
		</>
	);
};

export default Error404;
