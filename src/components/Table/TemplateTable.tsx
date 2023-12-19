import {App, Button, Col, Input, Row, Space, Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {useEffect, useState} from "react";
// import {useSearchFilter} from "./useSearchFilter";
import {FilterOutlined, PlusOutlined, RetweetOutlined} from "@ant-design/icons";
import {FilterValue, SorterResult} from "antd/es/table/interface";
import {ColumnProps} from "../../utils/types/table";
import {useAppDispatch} from "../../utils/hooks";
import {AppDispatch} from "../../store";


interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

interface TableProps<DataType> {
    onOpenModalCreate: () => void;
    onOpenModalEdit: () => void;
    columns: (columnProps: ColumnProps) => ColumnsType<DataType>;
    data: DataType[];
    getAll?: (relations?: RelationObject[]) => (dispatch: AppDispatch) => Promise<boolean>;
    getAllByDates?: (dates: DatesObject, relations?: RelationObject[]) => (dispatch: AppDispatch) => Promise<boolean>;
    relations?: RelationObject[];
    dates: DatesObject;
}

const TemplateTable = <DataType, >(tableProps: TableProps<DataType>) => {
    const {
        onOpenModalCreate,
        onOpenModalEdit,
        columns,
        data,
        getAll,
        getAllByDates,
        relations,
        dates
    } = tableProps;

    const dispatch = useAppDispatch()
    const {message} = App.useApp()
    const handleRefreshTable = async () => {
        setLoading(true)
        // @ts-ignore
        let statusResponse: boolean = false;
        if (getAll) {
            statusResponse = await dispatch(getAll(
                (function (): RelationObject[] {
                    return relations ? relations : []
                })()))
        } else if (getAllByDates) {
            statusResponse = await dispatch(getAllByDates(
                dates, (function (): RelationObject[] {
                    return relations ? relations : []
                })()))
        }
        setLoading(false)
        if (!statusResponse) message.error('Error al cargar los datos');
    }

    useEffect(() => {
        handleRefreshTable();
    }, []);

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
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<DataType> | SorterResult<DataType>[]
    ) => {
        setLoading(true);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
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
                            <Button icon={<PlusOutlined/>} onClick={onOpenModalCreate}>Nuevo</Button>
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
                    // @ts-ignore
                    columns={columns({
                        filteredInfo,
                        sortedInfo,
                        onOpenModal: onOpenModalEdit,
                    })}
                    // @ts-ignore
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    // @ts-ignore
                    onChange={handleTableChange}
                    scroll={{x: 1000, y: "65vh"}}
                />
            </Space>
        </>
    );
};

export default TemplateTable;
