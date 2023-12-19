import {Breadcrumb, Col, Row, Space} from "antd";
import React, {useState} from "react";
import {PieChartOutlined} from "@ant-design/icons";
import {Link, useOutletContext} from "react-router-dom";
import FormCreateEventModal from "./components/Forms/FormCreateEventModal.tsx";
import TemplateTable from "../../components/Table/TemplateTable.tsx";
import {columns} from "./components/Table/columns.tsx";
import {SessionTableDto} from "../../store/session/dto/session-table.dto.ts";
import {useAppSelector} from "../../utils/hooks";
import {getAllSession} from "../../store/session/api";

interface Context {
    setSelectItem: (key: string) => void;
}

const Session: React.FC = () => {
    const {setSelectItem}: Context = useOutletContext();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const sessions: SessionTableDto[] = useAppSelector(state => state.session.listTable);

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
                                {title: <span>Sesiones</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                {/*<SessionTable onOpenModal={() => setOpenModalCreate(true)}/>*/}
                <TemplateTable
                    onOpenModalCreate={() => setOpenModalCreate(true)}
                    onOpenModalEdit={() => setOpenModalCreate(true)}
                    columns={columns}
                    data={sessions}
                    getAll={getAllSession}
                    relations={[{
                        name: 'user',
                        state: true,
                    }]}
                    dates={{}}
                />
            </Space>
            <FormCreateEventModal open={openModalCreate} onCancel={() => setOpenModalCreate(false)}/>
        </>
    );
};

export default Session;