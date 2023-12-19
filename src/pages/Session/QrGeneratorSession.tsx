import {
    Breadcrumb, Button,
    Card,
    Col,
    Descriptions,
    Flex,
    QRCode,
    QRCodeProps,
    Row,
    Segmented, Skeleton,
    Space, Spin,
    Switch,
    Typography
} from "antd";
import {Link, useOutletContext} from "react-router-dom";
import {CheckOutlined, CloseOutlined, PieChartOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import type {DescriptionsProps} from 'antd';
import LogoUnamad from "../../assets/imgs/logo_unamad.png";

interface Context {
    setSelectItem: (key: string) => void;
}

const {Title} = Typography;

const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode-session')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

const QrGeneratorSession: React.FC = () => {
    const {setSelectItem}: Context = useOutletContext();

    const [loading, setLoading] = useState<boolean>(true);
    const [level, setLevel] = useState<string | number>('Q');
    const [auto, setAuto] = useState<boolean>(true);
    //const [size, setSize] = useState<number>(300);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {

    }, [auto]);

    const itemsInformation: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Laboratorio',
            children: 'SL01LA55',
        },
        {
            key: '2',
            label: 'Especialista',
            children: 'Admin Admin',
        },
        {
            key: '3',
            label: 'Turno',
            children: 'Mañana',
        },
        {
            key: '4',
            label: 'Fecha',
            children: '14/12/2023',
        },
    ];

    const itemsOptions: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nivel de Error',
            children: (
                <Segmented
                    options={['L', 'M', 'Q', 'H']}
                    value={level}
                    onChange={setLevel}
                />
            ),
        },
        {
            key: '2',
            label: 'Actualización automática',
            children: (
                <Switch
                    checkedChildren={<CheckOutlined/>}
                    unCheckedChildren={<CloseOutlined/>}
                    value={auto}
                    onChange={setAuto}
                />
            ),
        },
        {
            key: '3',
            label: 'Descargar QR',
            children: (
                <Button type="primary" onClick={downloadQRCode}>
                    Descargar
                </Button>
            ),
        },
    ];

    return (
        <>
            <div style={{width: "100%", height: "100%", padding: 20}}>
                <Row justify={"space-between"}>
                    <Col>
                        <Breadcrumb
                            style={{margin: 10}}
                            items={[
                                {
                                    title: (
                                        <Link to={"/"} onClick={() => setSelectItem("1")}>
                                            <PieChartOutlined/>
                                        </Link>
                                    ),
                                },
                                {title: <span>Sesion</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                {
                    loading && <Spin tip="Cargando" size="large" style={{
                        position: "relative",
                        top: "30vh",
                    }}>
                        <div className="content"/>
                    </Spin>
                }
                {/*<Spin tip="Cargando" spinning={loading} size="large" fullscreen>
                    <div className="content"/>
                </Spin>*/}
                <Skeleton
                    loading={loading}
                    active
                    paragraph={{rows: 10}}
                >
                    <Space direction={'vertical'}>
                        <Title level={5}>Generar QR</Title>
                        <Row justify={"center"} gutter={15}>
                            <Col sm={24} md={12} lg={10}>
                                <Card hoverable>
                                    <Space direction={'vertical'}>
                                        <Descriptions
                                            title={"Información de la sesión"}
                                            layout={"vertical"}
                                            items={itemsInformation}
                                        />
                                        <Descriptions
                                            title={"Opciónes de QR"}
                                            layout={"vertical"}
                                            items={itemsOptions}
                                        />
                                    </Space>
                                </Card>
                            </Col>
                            <Col sm={24} md={5}>
                                <Card hoverable>
                                    <Flex align={'center'} gap={10} vertical>
                                        <div id={'qrcode-session'}>
                                            <QRCode
                                                icon={LogoUnamad}
                                                value={"https://cenun-api-render.onrender.com/api/session/qr-reader/cf5fcb97-88ec-4a80-b47c-0a0fac288aec?user=true"}
                                                errorLevel={level as QRCodeProps['errorLevel']}
                                                status={'active'}
                                                size={300}
                                                iconSize={300 / 3}
                                            />
                                        </div>
                                    </Flex>
                                </Card>
                            </Col>
                        </Row>
                    </Space>
                </Skeleton>
            </div>
        </>
    );
}

export default QrGeneratorSession;