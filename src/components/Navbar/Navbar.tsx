import React, {useState} from "react";
import {Row, Col, Button, Avatar, Badge, Popover, Space, Typography} from "antd";

import {MenuOutlined, BellOutlined, UserOutlined} from "@ant-design/icons";

const {Title} = Typography;

interface NavbarProps {
    setCollapse: Function;
    collapse: boolean;
    openDrawer: Function;
}

const Navbar: React.FC<NavbarProps> = (navbarProps: NavbarProps) => {
    const {setCollapse, collapse, openDrawer} = navbarProps;

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false)
        localStorage.clear()
        window.location.reload()
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    }

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Button
                        type="ghost"
                        onClick={() => {
                            Number(window.visualViewport?.width) <= 576 ? openDrawer(true) : setCollapse(!collapse)
                        }}
                        icon={<MenuOutlined/>}
                    />
                </Col>
                <Col>
                    <Row align="middle" gutter={10}>
                        <Col>
                            <Button type="ghost" icon={
                                <Badge count={3}>
                                    <BellOutlined/>
                                </Badge>
                            }/>
                        </Col>
                        <Col>
                            <Popover
                                content={
                                    <Space direction={'vertical'}>
                                        <Space>
                                            <Avatar size={'large'} icon={<UserOutlined/>}/>
                                            <div>
                                                <Title level={5} style={{marginBottom: 0}}>Administrador</Title>
                                                <Badge status={'success'} text={'Activo'} />
                                            </div>
                                        </Space>
                                        <div style={{width: '100%', display: "flex", justifyContent: 'space-between'}}>
                                            <Button onClick={handleClose} size={'small'}>Editar</Button>
                                            <Button onClick={handleClose} size={'small'} danger={true}>Cerrar</Button>
                                        </div>
                                    </Space>

                                }
                                title={''}
                                trigger={'click'}
                                open={open}
                                onOpenChange={handleOpenChange}
                                arrow={{pointAtCenter: true}}
                                placement={'bottomRight'}
                            >
                                <Avatar shape="square" icon={<UserOutlined/>}/>
                            </Popover>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Navbar;