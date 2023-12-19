import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row, Space, Table, App} from "antd";
import {columns} from "./columns";
import {
    FilterValue,
    SorterResult,
    TablePaginationConfig,
} from "antd/es/table/interface";
import {
    FilterOutlined,
    PlusOutlined,
    RetweetOutlined,
} from "@ant-design/icons";
import {TableParams} from "../../../../utils/types/table";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {EventTableDto} from "../../../../store/event/dto/event-table.dto.ts";
import {getAllEvent} from "../../../../store/event/api";
import FormEditEventModal from "../Forms/FormEditEventModal.tsx";

interface TableProps {
    onOpenModal: () => void;
}

const EventTable: React.FC<TableProps> = (tableProps: TableProps) => {
    const {onOpenModal} = tableProps;

    const dispatch = useAppDispatch()
    const events: EventTableDto[] = useAppSelector(state => state.event.listTable)

    const {message} = App.useApp()

    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    useEffect(() => {
        handleRefreshTable();
    }, []);

    const handleRefreshTable = async () => {
        setLoading(true)
        const statusResponse = await dispatch(getAllEvent())
        setLoading(false)
        if (!statusResponse) message.error('Error al cargar los datos');
    }

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
    const [sortedInfo, setSortedInfo] = useState<SorterResult<EventTableDto>>({});


    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<EventTableDto> | SorterResult<EventTableDto>[]
    ) => {
        setLoading(true);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<EventTableDto>);
        setLoading(false);
    };

    const clearFiltersAndSorts = () => {
        setSortedInfo({});
        setFilteredInfo({});
    };

    return (
        <>
            <Space direction="vertical" size={"middle"} style={{width: "100%"}}>
                <Row justify={"space-between"}>
                    <Col>
                        <Input.Search
                            placeholder="Buscar"
                            onSearch={(value) => console.log(value)}
                            style={{width: 350}}
                        />
                    </Col>
                    <Col>
                        <Space>
                            <Button icon={<PlusOutlined/>} onClick={onOpenModal}>Nuevo Evento</Button>
                            <Button
                                icon={<FilterOutlined/>}
                                onClick={() => clearFiltersAndSorts()}
                            >
                                Limpiar filtros
                            </Button>
                            <Button onClick={handleRefreshTable} icon={<RetweetOutlined/>}/>
                        </Space>
                    </Col>
                </Row>
                <Table
                    columns={columns({
                        filteredInfo,
                        sortedInfo,
                        onOpenModal: () => setOpenModalEdit(true)
                    })}
                    dataSource={events}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    scroll={{x: 1000, y: "65vh"}}
                />
            </Space>
            <FormEditEventModal open={openModalEdit} onCancel={() => setOpenModalEdit(false)}/>
        </>
    );
};

export default EventTable;
