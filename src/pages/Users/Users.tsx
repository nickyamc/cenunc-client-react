import {Breadcrumb, Col, Row, Space} from "antd";
import React, {useState} from "react";
import {PieChartOutlined} from "@ant-design/icons";
import {Link, useOutletContext} from "react-router-dom";
import UserTable from "./components/Table/UserTable";
import FormCreateUserModal from "./components/Forms/FormCreateUserModal.tsx";

interface Context {
    setSelectItem: (key: string) => void;
}

const Users: React.FC = () => {
    const {setSelectItem}: Context = useOutletContext();

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <Space direction="vertical" style={{width: "100%", padding: 20}}>
                <Row justify={"space-between"}>
                    <Col>
                        <Breadcrumb
                            style={{margin: 10}}
                            items={[
                                {
                                    title: (
                                        <Link to={"/"} onClick={() => setSelectItem('1')}>
                                            <PieChartOutlined/>
                                        </Link>
                                    ),
                                },
                                {title: <span>Usuarios</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                <UserTable onOpenModal={() => setOpenModal(true)}/>
            </Space>
            <FormCreateUserModal open={openModal} onCancel={() => setOpenModal(false)} />
        </>
    );
};

export default Users;
