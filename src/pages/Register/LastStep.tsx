import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

type Props = {
  prev: (event?: React.MouseEvent<HTMLElement>) => void;
};

const LastStep: React.FC<Props> = ({ prev }) => {
  const [isStudent, setIsStudent] = useState<boolean>(false);

  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select size="large" style={{ width: 75 }}>
        <Option value="51">+51</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      style={{ width: "100%", maxWidth: "380px", margin: "20px 0" }}
      form={form}
      initialValues={{ prefix: "51" }}
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
          ¡Casi listo!
        </Title>
        <Text type="secondary" strong style={{ fontSize: 15, display: "flex", textAlign: "center" }}>
          Necesitemos que nos indiques algunos datos para ayudarnos.
        </Text>
      </Space>
      <Form.Item
        name="phone"
        label="Número de teléfono:"
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese su número de teléfono!",
            whitespace: true,
          },
          {
            min: 9,
            message: "¡El número de teléfono debe tener 9 dígitos!",
          },
          {
            pattern: new RegExp("^[9][0-9]*$"),
            message: "¡El número de teléfono debe empezar con 9!",
          },
        ]}
        hasFeedback
      >
        <Input
          size="large"
          addonBefore={prefixSelector}
          style={{ width: "100%" }}
          placeholder="987654321"
          maxLength={9}
        />
      </Form.Item>
      <Form.Item name="sex" label="Sexo:">
        <Select size="large" style={{ width: "100%" }}>
          <Option value="1">Masculino</Option>
          <Option value="2">Femenino</Option>
          <Option value="0">Otro</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="career"
        label="Carrera:"
        rules={[
          {
            required: isStudent,
            message: "¡Por favor ingrese su carrera!",
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="" />
      </Form.Item>
      <Form.Item
        name="university"
        label="Universidad:"
        rules={[
          {
            required: isStudent,
            message: "¡Por favor ingrese su universidad!",
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input size="large" placeholder="" />
      </Form.Item>
      <Form.Item style={{ marginTop: 50 }}>
        <Space
          align="center"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            htmlType="submit"
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
            Crear cuanta
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LastStep;
