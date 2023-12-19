/*
import {
	AlipayCircleOutlined,
	InfoCircleOutlined,
	LockOutlined,
	TaobaoCircleOutlined,
	UserOutlined,
	WeiboCircleOutlined,
} from "@ant-design/icons";
import {
	LoginForm,
	ProFormCheckbox,
	ProFormText,
} from "@ant-design/pro-components";
import { Space, Tabs, Tooltip } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import LogoCucs from "../../assets/svgs/logo_cucs.svg";

type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
	marginInlineStart: "16px",
	color: "rgba(0, 0, 0, 0.2)",
	fontSize: "24px",
	verticalAlign: "middle",
	cursor: "pointer",
};

const ProFormLogIn: React.FC = () => {
	const [loginType, setLoginType] = useState<LoginType>("account");
	return (
		<LoginForm
			logo={LogoCucs}
			title="Cenunc"
			subTitle="Plataforma de Gestion de las CUCs."
			actions={
				<Space>
					Otros métodos
					<AlipayCircleOutlined style={iconStyles} />
					<TaobaoCircleOutlined style={iconStyles} />
					<WeiboCircleOutlined style={iconStyles} />
				</Space>
			}
		>
			<Tabs
				centered
				activeKey={loginType}
				onChange={(activeKey) => setLoginType(activeKey as LoginType)}
			>
				<Tabs.TabPane key={"account"} tab={"Cuenta"} />
			</Tabs>
			{loginType === "account" && (
				<>
					<ProFormText
						name="username"
						fieldProps={{
							size: "large",
							prefix: <UserOutlined className={"prefixIcon"} />,
							suffix: (
								<Tooltip title="En caso de estudiante interno, su codigo de estudiante.">
									<InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)", cursor: "pointer", }} />
								</Tooltip>
							),
						}}
						placeholder={"Nombre de Usuario o E-mail"}
						rules={[
							{
								required: true,
								message: "¡Por favor ingrese su nombre de usuario!",
							},
						]}
					/>
					<ProFormText.Password
						name="password"
						fieldProps={{
							size: "large",
							prefix: <LockOutlined className={"prefixIcon"} />,
						}}
						placeholder={"Contraseña"}
						rules={[
							{
								required: true,
								message: "¡Por favor ingrese su contraseña!",
							},
						]}
					/>
				</>
			)}
			<div
				style={{
					marginBlockEnd: 24,
				}}
			>
				<ProFormCheckbox noStyle name="autoLogin">
					Ingreso automático
				</ProFormCheckbox>
				<a
					style={{
						float: "right",
					}}
				>
					¿Olvidaste tu contraseña?
				</a>
			</div>
		</LoginForm>
	);
};

export default ProFormLogIn;
*/
