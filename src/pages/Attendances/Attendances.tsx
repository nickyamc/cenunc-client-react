import {Breadcrumb, Col, Row, Space} from "antd";
import React, {useState} from "react";
import {PieChartOutlined} from "@ant-design/icons";
import {Link, useOutletContext} from "react-router-dom";
import TemplateTable from "../../components/Table/TemplateTable.tsx";
import {useAppSelector} from "../../utils/hooks";
import {AttendanceTableDto} from "../../store/attendance/dto/attendance-table.dto.ts";
import {getAllAttendance} from "../../store/attendance/api";
import {columns} from "./components/Table/columns.tsx";

interface Context {
    setSelectItem: (key: string) => void;
}

const Attendances: React.FC = () => {

    const {setSelectItem}: Context = useOutletContext();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const attendances: AttendanceTableDto[] = useAppSelector(state => state.attendance.listTable);

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
                                {title: <span>Asistencias</span>},
                            ]}
                        />
                    </Col>
                    <Col></Col>
                </Row>
                <TemplateTable
                    onOpenModalCreate={() => setOpenModalCreate(true)}
                    onOpenModalEdit={() => setOpenModalCreate(true)}
                    columns={columns}
                    data={attendances}
                    getAllByDates={getAllAttendance}
                    relations={[
                        {
                            name: 'lab',
                            state: true,
                        },
                        {
                            name: 'visitor',
                            state: true,
                        },
                        {
                            name: 'event',
                            state: true,
                        },
                        {
                            name: 'session',
                            state: true,
                        }
                    ]}
                    dates={{}}
                />
            </Space>
        </>
    );
};

export default Attendances;
