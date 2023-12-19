import {Breadcrumb, Col, Row, Space} from "antd";
import React, {useState} from "react";
import {PieChartOutlined} from "@ant-design/icons";
import {Link, useOutletContext} from "react-router-dom";
import {EventTable} from "./components/Table";
import FormCreateEventModal from "./components/Forms/FormCreateEventModal.tsx";

interface Context {
    setSelectItem: (key: string) => void;
}

const Events: React.FC = () => {
    const {setSelectItem}: Context = useOutletContext();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

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
                                {title: <span>Eventos</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                <EventTable onOpenModal={() => setOpenModalCreate(true)}/>
            </Space>
            <FormCreateEventModal open={openModalCreate} onCancel={() => setOpenModalCreate(false)}/>
        </>
    );
};

export default Events;
