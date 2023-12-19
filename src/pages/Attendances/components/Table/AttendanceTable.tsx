import React, {useState} from "react";
import {Button, Col, Input, Row, Space, Table} from "antd";
import {columns} from "./columns.tsx";
import {FilterValue, SorterResult, TablePaginationConfig,} from "antd/es/table/interface";
import {FilterOutlined, PlusOutlined, RetweetOutlined,} from "@ant-design/icons";
import {AttendanceDataTable, TableParams} from "../../../../utils/types/table";
import {VisitorType} from "../../../../store/enum/visitorType.ts";
import {SessionEntry} from "../../../../store/enum/sessionEntry.ts";

const AttendanceTable: React.FC = () => {
    const data: AttendanceDataTable[] = [
        {
            key: 1,
            id: 1,
            checkCode: 'saytdn-atysk-autnps',
            labId: 1,
            visitorId: 1,
            eventId: 1,
            sessionId: 1,
            lab: {
                id: 1,
                suneduCode: 'SL01LA55',
                qrCode: 'kasjdy-yrtrs-ahfrws',
                location: 'Primer Piso de la Biblioteca - Ciudad Universitaria'
            },
            visitor: {
                id: 1,
                type: VisitorType.STUDENT ,
                account: {
                    dni: `60640338`,
                    username: `17121024`,
                    email: `nmacedoc@unamad.edu.pe`,
                    lastName: `Macedo Cordova`,
                    firstName: `Nick Angel`,
                    phone: `+51987654321`,
                },
                studentCode: `17121024`,
                qrCode: `uayeks-ytrna-ystabs`,
                university: `UNAMAD`,
                faculty: 'INGENIERIA',
                career: `ISI`,
            },
            event: {
                id: 1,
                title: `Centros Universitarios de Conectividad`,
                description: `CUCS - Centros Universitarios de Conectividad`,
                location: `Campus Universitario - UNAMAD`,
            },
            session: {
                id: 1,
                entry: SessionEntry.AFTERNOON,
                userId: 1,
            },
            dateRecord: {
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        },
    ];

    const [loading, setLoading] = useState<boolean>(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [filteredInfo, setFilteredInfo] = useState<
        Record<string, FilterValue | null>
    >({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<AttendanceDataTable>>({});

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<AttendanceDataTable> | SorterResult<AttendanceDataTable>[]
    ) => {
        setLoading(true);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<AttendanceDataTable>);
        setLoading(false);
    };

    const clearFiltersAndSorts = () => {
        setSortedInfo({});
        setFilteredInfo({});
    };

    return (
        <>
            <Space direction="vertical" size={"middle"} style={{width: "100%"}}>
                <Row justify={"space-between"} gutter={[0, 10]}>
                    <Col>
                        <Input.Search
                            placeholder="Buscar"
                            onSearch={(value) => console.log(value)}
                            style={{width: 350}}
                        />
                    </Col>
                    <Col>
                        <Space>
                            <Button icon={<PlusOutlined/>}>Nueva Asistencia</Button>
                            <Button
                                icon={<FilterOutlined/>}
                                onClick={() => clearFiltersAndSorts()}
                            >
                                Limpiar filtros
                            </Button>
                            <Button icon={<RetweetOutlined/>}/>
                        </Space>
                    </Col>
                </Row>
                <Table
                    columns={columns({filteredInfo, sortedInfo})}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    scroll={{x: 1000, y: "65vh"}}
                />
            </Space>
        </>
    );
};

export default AttendanceTable;
