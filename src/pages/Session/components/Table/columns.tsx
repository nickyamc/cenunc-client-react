import {ColumnsType} from "antd/es/table";
import {
    Button,
    Dropdown,
    MenuProps,
    Space,
} from "antd";
import {
    FormOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {ColumnProps} from "../../../../utils/types/table";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {deleteSession} from "../../../../store/session/api";
import {useAppDispatch} from "../../../../utils/hooks";
import {editSession} from "../../../../store/session/slice";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import {SessionTableDto} from "../../../../store/session/dto/session-table.dto.ts";

const DropdownButton = ({record, onOpenModal}: { record: SessionTableDto, onOpenModal: Function }) => {

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
                dispatch(editSession(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'laboratotio'} id={record.id} remove={deleteSession}/>,
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

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<SessionTableDto> => [
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
        title: "Turno",
        dataIndex: "entry",
        key: "entry",
        sorter: (a, b) => (a.entry > b.entry ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "entry" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.entry || null,
        width: 100,
    },
    /*{
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => (a.status > b.status ? 1 : -1),
        sortOrder: sortedInfo?.columnKey === "description" ? sortedInfo.order : null,
        sortDirections: ["descend", "ascend"],
    },*/
    /*{
        title: "Laboratorio",
        key: "lab",
        render: (record) => {
            return record.user?.lab?.suneduCode;
        }
    },*/
    {
        title: "Usuario",
        key: "user",
        render: (record) => `${record.user.account.firstName} ${record.user.account.lastName}`,
    },
    {
        title: "Registro",
        key: "createdAt",
        sorter: (a, b) => (a.dateRecord?.createdAt > b.dateRecord?.createdAt ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
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
    },
];
