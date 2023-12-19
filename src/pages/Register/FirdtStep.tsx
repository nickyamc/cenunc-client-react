import { Button, Form, Input, Space, Switch, Typography } from "antd";
import React, { useState } from "react";

const { Search } = Input;
const { Title, Text } = Typography;

type Props = {
  next: (event?: React.MouseEvent<HTMLElement>) => void;
};

const FirdtStep: React.FC<Props> = ({ next }) => {
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onSearch = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

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
      initialValues={{ isStudent: isStudent }}
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
          ¡Bienvenido/a! Vamos a crear tu perfil
        </Title>
        <Text type="secondary" strong style={{ fontSize: 15, display: "flex", textAlign: "center" }}>
          Necesitamos que nos indiques unos datos antes de empezar.
        </Text>
      </Space>
      <Form.Item
        name="isStudent"
        label="Estudiante universitario:"
        valuePropName="checked"
      >
        <Switch onChange={() => setIsStudent(!isStudent)} />
      </Form.Item>
      <Form.Item
        name="studentCode"
        label="Código de estudiante:"
        tooltip="Ingrese su codigo de estudiante para encontrar sus datos."
        rules={[
          {
            required: isStudent,
            message: "¡Por favor ingrese su código de estudiante!",
          },
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              if (isNaN(value)) {
                return Promise.reject(
                  "¡El código de estudiante debe ser numérico!"
                );
              }
              if (value.toString().length === 8) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("¡El código de estudiante debe tener 8 dígitos!")
              );
            },
          }),
        ]}
      >
        <Search
          type="number"
          size="large"
          placeholder="22120012"
          onSearch={onSearch}
          enterButton
          loading={loading}
          disabled={!isStudent}
        />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Nombre:"
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su nombre!",
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="Juan Jose" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Apellidos:"
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su apellido!",
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="Dueñas Linares" />
      </Form.Item>
      <Form.Item style={{ marginTop: 50 }}>
        <Space
          align="center"
          style={{ display: "flex", justifyContent: "right" }}
        >
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

export default FirdtStep;
