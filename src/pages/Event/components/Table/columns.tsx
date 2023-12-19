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
import {EventTableDto} from "../../../../store/event/dto/event-table.dto.ts";
import {deleteEvent} from "../../../../store/event/api";
import {useAppDispatch} from "../../../../utils/hooks";
import {editEvent} from "../../../../store/event/slice";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";

const DropdownButton = ({record, onOpenModal}: { record: EventTableDto, onOpenModal: Function }) => {

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
                dispatch(editEvent(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'laboratotio'} id={record.id} remove={deleteEvent}/>,
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

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<EventTableDto> => [
    {
        title: "#",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "id" ? sortedInfo.order : null,
        width: 70,
    },
    {
        title: "Título",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => (a.title > b.title ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "title" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.suneduCode || null,
        width: "20%",
    },
    {
        title: "Descripción",
        dataIndex: "description",
        key: "description",
        sorter: (a, b) => (a.description > b.description ? 1 : -1),
        sortOrder: sortedInfo?.columnKey === "description" ? sortedInfo.order : null,
        sortDirections: ["descend", "ascend"],
    },
    {
        title: "Ubicación",
        dataIndex: "location",
        key: "location",
        sorter: (a, b) => (a.location > b.location ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <DropdownButton record={record} onOpenModal={onOpenModal} />
        ),
        width: 60,
    },
];
