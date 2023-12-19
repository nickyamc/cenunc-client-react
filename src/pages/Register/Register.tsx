import React, { useState } from "react";
import { Button, message, Steps, theme, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FirdtStep from "./FirdtStep";
import SecondStep from "./SecondStep";
import LogoCucs from "../../assets/svgs/logo_cucs.svg";
import LastStep from "./LastStep";

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "",
      content: <FirdtStep next={next} />,
    },
    {
      title: "",
      content: <SecondStep next={next} prev={prev} />,
    },
    {
      title: "",
      content: <LastStep prev={prev} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    width: "100%",
    maxWidth: 600,
    display: "flex",
    justifyContent: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: "0 15px",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1.5rem",
            marginLeft: "-1.5rem",
          }}
        >
          <img src={LogoCucs} width={50} />
          <Title level={1} style={{ margin: 0 }}>
            Cenunc
          </Title>
        </div>
        <Steps
          current={current}
          responsive={false}
          labelPlacement="vertical"
          items={items}
          style={{ width: "100%", maxWidth: 500 }}
        />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
            icon={<ArrowLeftOutlined />}
          >
            Volver
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Siguiente paso
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Enviar
          </Button>
        )}
      </div>
    </>
  );
};

export default Register;
