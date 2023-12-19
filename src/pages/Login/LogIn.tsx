import { Layout, Col, Row } from "antd";
import React from "react";
import ImgUnamad from "../../assets/imgs/logo_unamad_text.png";
import ImgLogin from "../../assets/imgs/login.jpg";
import { FormLogIn } from "../../components";

const LogIn: React.FC = () => {
	return (
		<Layout style={{ height: "100vh", background: "white" }}>
			<Row>
				<Col
					sm={{ span: 24, order: 2 }}
					md={{ span: 12, order: 1 }}
					lg={11}
					xl={9}
					style={{ height: "100vh", padding: "40px 50px" }}
				>
					<Row style={{ flexDirection: "column", gap: 30 }}>
						<Col style={{ width: "100%", marginLeft: 25 }}>
							<img src={ImgUnamad} width={180} />
						</Col>
						<Col style={{width: "100%", display: "flex", justifyContent: "center"}}>
							<FormLogIn />
						</Col>
					</Row>
				</Col>
				<Col
					sm={{ span: 24, order: 1 }}
					md={{ span: 12, order: 2 }}
					lg={13}
					xl={15}
					style={{ backgroundImage: `url(${ImgLogin})` }}
				></Col>
			</Row>
		</Layout>
	);
};

export default LogIn;
