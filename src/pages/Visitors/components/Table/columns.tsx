import {ColumnsType} from "antd/es/table";
import {
    Button,
    Dropdown,
    MenuProps,
    Popover,
    QRCode,
    Space,
    Tag,
} from "antd";
import {
    FormOutlined,
    MoreOutlined,
    QrcodeOutlined,
} from "@ant-design/icons";
import {ColumnProps} from "../../../../utils/types/table";
import {useAppDispatch} from "../../../../utils/hooks";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {VisitorTableDto} from "../../../../store/visitor/dto/visitor-table.dto.ts";
import {editVisitor} from "../../../../store/visitor/slice";
import {deleteVisitor} from "../../../../store/visitor/api";
import {VisitorType} from "../../../../store/enum/visitorType.ts";

const DropdownButton = ({record, onOpenModal}: { record: VisitorTableDto, onOpenModal: Function }) => {

    const dispatch = useAppDispatch()

    const items: MenuProps["items"] = [
        {
            label: (
                <Space style={{width: "100%"}}>
                    <FormOutlined/>
                    Editar
                </Space>
            ),
            key: "1",
            onClick: () => {
                dispatch(editVisitor(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'visitor'} id={record.id} remove={deleteVisitor}/>,
            key: "2",
            onClick: () => {
                console.log(`Eliminar: ${record.key}`);
            },
            danger: true,
        },
    ];

    return (
        <Dropdown menu={{items}} trigger={["click"]}>
            <Button icon={<MoreOutlined/>} size="small"/>
        </Dropdown>
    );
}

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<VisitorTableDto> => [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => Number(a.key) - Number(b.key),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "key" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.key || null,
        width: 70,
    },
    {
        title: "Tipo",
        //dataIndex: "type",
        key: "type",
        sorter: (a, b) => (a.type > b.type ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "type" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.type || null,
        render: (record) => {
            if (record.type === VisitorType.STUDENT)
                return <Tag color="green">{record.type}</Tag>;
            if (record.type === VisitorType.TEACHER)
                return <Tag color="purple">{record.type}</Tag>;
            if (record.type === VisitorType.EXTERNAL)
                return <Tag color="blue">{record.type}</Tag>;
        },
        width: 100,
    },
    {
        title: "Usuario",
        key: "username",
        sorter: (a, b) => (a.account.username > b.account.username ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "username" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.username || null,
        render: (record) => (
            <Popover
                overlayInnerStyle={{padding: 0}}
                content={
                    <QRCode errorLevel="H" value={record.qrCode} bordered={false}/>
                }
            >
                <Space>
                    <QrcodeOutlined/>
                    {record.account.username}
                </Space>
            </Popover>
        ),
        width: 110,
    },
    {
        title: "Código de Estudiante",
        dataIndex: "studentCode",
        key: "studentCode",
        sorter: (a, b) => (a.career > b.career ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder:
            sortedInfo?.columnKey === "studentCode" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.studentCode || null,
        width: 110,
    },
    {
        title: "Nombre",
        key: "name",
        sorter: (a, b) =>
            `${a.account.firstName} ${a.account.lastName}` >
            `${b.account.firstName} ${b.account.lastName}`
                ? 1
                : -1,
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "name" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.name || null,
        render: (record) =>
            `${record.account.firstName} ${record.account.lastName}`,
        width: 320,
    },
    {
        title: "Email",
        key: "email",
        sorter: (a, b) => (a.account.email > b.account.email ? 1 : -1),
        sortOrder: sortedInfo?.columnKey === "email" ? sortedInfo.order : null,
        sortDirections: ["descend", "ascend"],
        filteredValue: filteredInfo?.email || null,
        render: (record) => record.account.email,
        width: 250,
    },
    {
        title: "Teléfono",
        key: "phone",
        // @ts-ignore
        sorter: (a, b) => (a.account.phone > b.account.phone ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "phone" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.phone || null,
        render: (record) => record.account.phone,
        width: 150,
    },
    {
        title: "Universidad",
        dataIndex: "university",
        key: "university",
        sorter: (a, b) => (a.career > b.career ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "university" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.university || null,
        width: 120,
    },
    {
        title: "Facultad",
        dataIndex: "faculty",
        key: "faculty",
        sorter: (a, b) => (a.career > b.career ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "faculty" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.faculty || null,
        width: 120,
    },
    {
        title: "Carrera",
        dataIndex: "career",
        key: "career",
        sorter: (a, b) => (a.career > b.career ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "career" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.suneduCode || null,
        width: 350,
    },
    {
        title: "Registro",
        key: "createdAt",
        //sorter: (a, b) => (a.datacreatedAt > b.createdAt ? 1 : -1),
        render: (record) => {
            const date = new Date(record.dateRecord.createdAt);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        width: 110,
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <DropdownButton record={record} onOpenModal={onOpenModal}/>
        ),
        width: 60,
        fixed: "right",
    },
];
