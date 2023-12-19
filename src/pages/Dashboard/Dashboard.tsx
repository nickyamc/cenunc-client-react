import React from "react";
import { Breadcrumb, Card, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  ClusterOutlined,
  FileDoneOutlined,
  FundProjectionScreenOutlined,
  PieChartOutlined,
  TeamOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Statistic from "antd/es/statistic/Statistic";
import CountUp from "react-countup";
import { valueType } from "antd/es/statistic/utils";
import DemoLine from "./DemoLine";
import DemoBar from "./DemoBar";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const formatter = (value: valueType) => (
    <CountUp end={Number(value)} separator="," />
  );
  return (
    <>
      <Space direction="vertical" style={{ width: "100%", padding: 20 }}>
        <Row justify={"space-between"}>
          <Col>
            <Breadcrumb
              style={{ margin: 10 }}
              items={[
                {
                  title: (
                    <Link to={"/"}>
                      <PieChartOutlined />
                    </Link>
                  ),
                },
              ]}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row
          justify={"space-between"}
          wrap
          gutter={[
            { xs: 10, sm: 16, md: 24, lg: 32 },
            { xs: 10, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={
                  <Title level={5} type="secondary">
                    Asistencias
                  </Title>
                }
                value={7452}
                prefix={<FileDoneOutlined />}
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={
                  <Title level={5} type="secondary">
                    Eventos
                  </Title>
                }
                value={3}
                prefix={<FundProjectionScreenOutlined />}
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={
                  <Title level={5} type="secondary">
                    Laboratorios
                  </Title>
                }
                value={3}
                prefix={<ClusterOutlined />}
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={
                  <Title level={5} type="secondary">
                    Registrados
                  </Title>
                }
                value={545}
                prefix={<TeamOutlined />}
                formatter={formatter}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }} gutter={[32, 32]}>
          <Col sm={24} xl={15}>
            <Card hoverable>
              <Title level={5} type="secondary" style={{ marginBottom: 20 }}>
                <LineChartOutlined /> Asistencias
              </Title>
              <DemoLine />
            </Card>
          </Col>
          <Col sm={24} xl={9}>
            <Card hoverable>
              <Title level={5} type="secondary" style={{ marginBottom: 20 }}>
                <BarChartOutlined /> Vistantes Atendidos por Especialistas
              </Title>
              <DemoBar />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default Dashboard;
