import {ColumnsType} from "antd/es/table";
import {
    Button,
    Dropdown,
    MenuProps,
    Popover, QRCode,
    Space,
} from "antd";
import {
    FormOutlined,
    MoreOutlined, QrcodeOutlined,
} from "@ant-design/icons";
import {ColumnProps} from "../../../../utils/types/table";
import {useAppDispatch} from "../../../../utils/hooks";
import {editAttendance} from "../../../../store/attendance/slice";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {deleteAttendance} from "../../../../store/attendance/api";
import {AttendanceTableDto} from "../../../../store/attendance/dto/attendance-table.dto.ts";

const DropdownButton = ({record, onOpenModal}: { record: AttendanceTableDto, onOpenModal: Function }) => {

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
                dispatch(editAttendance(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'asistencia'} id={record.id} remove={deleteAttendance}/>,
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

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<AttendanceTableDto> => [
    {
        title: "#",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => Number(a.key) - Number(b.key),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "key" ? sortedInfo.order : null,
        width: 70,
    },
    {
        title: "Código",
        dataIndex: "checkCode",
        key: "checkCode",
        sorter: (a, b) => (a.checkCode > b.checkCode ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnkey === "checkCode" ? sortedInfo.order : null,
        render: (text) => (
            <Popover
                overlayInnerStyle={{ padding: 0 }}
                content={<QRCode errorLevel="H" value={text} bordered={false} />}
            >
                <Space>
                    <QrcodeOutlined />
                    {text}
                </Space>
            </Popover>
        ),
        width: 240
    },
    {
        title: "Laboratorio",
        key: "lab",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => (
            `${a.lab?.suneduCode || ""}` > `${b.lab?.suneduCode || ""}` ? 1 : -1
        ),
        sortOrder: sortedInfo?.columnkey === "lab" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.lab || null,
        render: (record) => record.lab.suneduCode,
        width: 130,
    },
    {
        title: "Visitante",
        key: "visitor",
        sorter: (a, b) => (
            `${a.visitor?.account.firstName || ""} ${a.visitor?.account.lastName || ""}` >
            `${b.visitor?.account.firstName || ""} ${b.visitor?.account.lastName || ""}`
                ? 1
                : -1
        ),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "visitor" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.visitor || null,
        width: 260,
        render: (record) =>
            `${record.visitor.account.firstName} ${record.visitor.account.lastName || ""}`,
    },
    {
        title: "Evento",
        key: "event",
        sorter: (a, b) => (
            `${a.event?.title || ""}` > `${b.event?.title || ""}` ? 1 : -1
        ),
        sortOrder: sortedInfo?.columnKey === "event" ? sortedInfo.order : null,
        sortDirections: ["descend", "ascend"],
        render: (record) => record.event.title,
        width: 200
    },
    {
        title: "Registro",
        key: "createdAt",
        sorter: (a, b) => (a.dateRecord?.createdAt > b.dateRecord?.createdAt ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
        render: (record) => {
            const date = new Date(record.dateRecord.createdAt);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        },
        width: 150,
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <DropdownButton record={record} onOpenModal={onOpenModal}/>
        ),
        width: 60,
    },
];
