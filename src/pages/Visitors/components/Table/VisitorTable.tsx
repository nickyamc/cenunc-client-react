import React, {useEffect, useState} from "react";
import {App, Button, Col, Input, Row, Space, Table} from "antd";
import {columns} from "./columns";
import {FilterValue, SorterResult, TablePaginationConfig,} from "antd/es/table/interface";
import {FilterOutlined, PlusOutlined, RetweetOutlined,} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {VisitorTableDto} from "../../../../store/visitor/dto/visitor-table.dto.ts";
import {getAllVisitor} from "../../../../store/visitor/api";
import FormEditVisitorModal from "../Forms/FormEditVisitorModal.tsx";

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

interface TableProps {
    onOpenModal: () => void;
}

const VisitorTable: React.FC<TableProps> = (tableProps: TableProps) => {
    const {onOpenModal} = tableProps;

    const dispatch = useAppDispatch();
    const visitors: VisitorTableDto[] = useAppSelector(state => state.visitor.listTable);

    const {message} = App.useApp();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    const handleRefreshTable = async () => {
        setLoading(true);
        const statusResponse = await dispatch(getAllVisitor());
        setLoading(false);
        if (!statusResponse) message.error("Error al cargar los datos");
    };

    useEffect(() => {
        handleRefreshTable();
    }, []);

    // ------------ Config Table ------------
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
    const [sortedInfo, setSortedInfo] = useState<SorterResult<VisitorTableDto>>({});

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<VisitorTableDto> | SorterResult<VisitorTableDto>[]
    ) => {
        setLoading(true);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<VisitorTableDto>);
        setLoading(false);
    };

    const clearFiltersAndSorts = () => {
        setSortedInfo({});
        setFilteredInfo({});
    };

    return (
        <>
            <Space direction="vertical" size="middle" style={{width: "100%"}}>
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
                            <Button icon={<PlusOutlined/>} onClick={onOpenModal}>Nuevo Visitante</Button>
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
                        onOpenModal: () => setOpenModalEdit(true),
                    })}
                    dataSource={visitors}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    scroll={{x: 1000, y: "63vh"}}
                />
            </Space>
            <FormEditVisitorModal open={openModalEdit} onCancel={() => setOpenModalEdit(false)}/>
        </>
    );
};

export default VisitorTable;
