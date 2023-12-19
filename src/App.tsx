import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ConfigProvider, theme, App as AppAntd } from "antd";

const App: React.FC = () => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
				token: { colorPrimary: "#ff4187" },
			}}
		>
			<AppAntd>
				<RouterProvider router={router} />
			</AppAntd>
		</ConfigProvider>
	);
};

export default App;
