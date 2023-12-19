import {Breadcrumb, Col, Row, Space} from "antd";
import React, {useState} from "react";
import {PieChartOutlined} from "@ant-design/icons";
import {Link, useOutletContext} from "react-router-dom";
import {LabTable} from "./components/Table";
import FormCreateLabModal from "./components/Forms/FormCreateLabModal.tsx";

interface Context {
    setSelectItem: (key: string) => void;
}

const Labs: React.FC = () => {
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
                                        <Link to={"/"} onClick={() => setSelectItem("1")}>
                                            <PieChartOutlined/>
                                        </Link>
                                    ),
                                },
                                {title: <span>Laboratorios</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                <LabTable onOpenModal={() => setOpenModal(true)}/>
            </Space>
            <FormCreateLabModal open={openModal} onCancel={() => setOpenModal(false)}/>
        </>
    );
};

export default Labs;
