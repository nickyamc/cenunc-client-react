import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;

type Props = {
  next: (event?: React.MouseEvent<HTMLElement>) => void;
  prev: (event?: React.MouseEvent<HTMLElement>) => void;
};

const SecondStep: React.FC<Props> = ({ next, prev }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    next();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      style={{ width: "100%", maxWidth: 420, margin: "20px 0" }}
      form={form}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Space
        direction="vertical"
        align="center"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Elige tus credenciales
        </Title>
        <Text type="secondary" strong style={{ fontSize: 15, display: "flex", textAlign: "center" }}>
          Indícanos tu email, nombre de usuario y tu contraseña para acceder.
        </Text>
      </Space>
      <Form.Item
        name="email"
        label="Correo electrónico:"
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su correo electrónico!",
            whitespace: true,
          },
          { type: "email", message: "¡El correo electrónico no es válido!" },
        ]}
        hasFeedback
      >
        <Input type="email" size="large" placeholder="ejemplo@gmail.com" />
      </Form.Item>
      <Form.Item
        name="username"
        label="Nombre de usuario:"
        tooltip="En caso de estudiante, su codigo de estudiante sera utilizara como nombre de usuario."
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su nombre de usuario!",
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="codisin12" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Contraseña:"
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su contraseña!",
          },
          {
            min: 8,
            message: "¡La contraseña debe tener 8 carácteres mínimo!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          size="large"
          placeholder="Debe contener 8 carácteres mínimo."
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Contraseña:"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "¡Por favor, confirme su contraseña!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("¡La nueva contraseña que ingresó no coincide!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Debe coincidir con la anterior."
        />
      </Form.Item>
      <Form.Item style={{ marginTop: 50 }}>
        <Space
          align="center"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            htmlType="button"
            style={{ width: "100%" }}
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={prev}
          >
            Volver
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
          >
            Siguiente paso
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SecondStep;
