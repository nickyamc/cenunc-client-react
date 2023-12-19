import {ColumnsType} from "antd/es/table";
import {
    Badge,
    Button,
    Dropdown,
    MenuProps,
    Space,
    Tag,
} from "antd";
import {
    FormOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {ColumnProps} from "../../../../utils/types/table";
import {UserRole} from "../../../../store/enum/userRole.ts";
import {useAppDispatch} from "../../../../utils/hooks";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {deleteUser} from "../../../../store/user/api";
import {editUser} from "../../../../store/user/slice";
import {UserTableDto} from "../../../../store/user/dto/user-table.dto.ts";

const DropdownButton = ({record, onOpenModal}: { record: UserTableDto, onOpenModal: Function }) => {

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
                dispatch(editUser(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'user'} id={record.id} remove={deleteUser}/>,
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

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<UserTableDto> => [
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
        title: "Rol",
        key: "role",
        sorter: (a, b) => (a.role > b.role ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "role" ? sortedInfo.order : null,
        render: (record) => {
            return record.role === UserRole.ADMIN ? (
                <Tag color="gold">{record.role}</Tag>
            ) : (
                <Tag color="cyan">{record.role}</Tag>
            );
        },
        width: 100,
    },
    {
        title: "Estado",
        key: "status",
        render: (record) =>
            record.isActive ? (
                <Badge color="green" text="Activo"/>
            ) : (
                <Badge color="red" text="Inactivo"/>
            ),
        width: 100,
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
        filteredValue: filteredInfo?.suneduCode || null,
        width: 300,
        render: (record) =>
            `${record.account.firstName} ${record.account.lastName || ""}`,
    },
    {
        title: "Email",
        key: "email",
        sorter: (a, b) => (a.account.email > b.account.email ? 1 : -1),
        sortOrder: sortedInfo?.columnKey === "email" ? sortedInfo.order : null,
        sortDirections: ["descend", "ascend"],
        render: (record) => record.account.email,
        width: 250
    },
    {
        title: "Teléfono",
        key: "phone",
        // @ts-ignore
        sorter: (a, b) => (a.account.phone > b.account.phone ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "phone" ? sortedInfo.order : null,
        render: (record) => record.account.phone,
        width: 160,
    },
    {
        title: "Profesión",
        dataIndex: "jobTitle",
        key: "jobTitle",
        sorter: (a, b) => (a.jobTitle > b.jobTitle ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "jobTitle" ? sortedInfo.order : null,
        width: 200,
    },
    {
        title: "Denominación",
        dataIndex: "denomination",
        key: "denomination",
        sorter: (a, b) => (a.denomination > b.denomination ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "denomination" ? sortedInfo.order : null,
        width: 200,
    },
    {
        title: "Edad",
        key: "age",
        render: (record) =>
            /*record.birthdate.toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
            }), */
            record.birthdate ?
                new Date().getFullYear() - new Date(record.birthdate).getFullYear() :
                '-',
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
