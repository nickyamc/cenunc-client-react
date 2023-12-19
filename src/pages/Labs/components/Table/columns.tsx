import {ColumnsType} from "antd/es/table";
import {
    Button,
    Dropdown,
    MenuProps,
    Popover,
    QRCode,
    Space,
} from "antd";
import {
    FormOutlined,
    MoreOutlined,
    QrcodeOutlined,
} from "@ant-design/icons";
import {ColumnProps} from "../../../../utils/types/table";
import {LabTableDto} from "../../../../store/lab/dto/lab-table.dto";
import {useAppDispatch} from "../../../../utils/hooks";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {deleteLab} from "../../../../store/lab/api";
import {editLab} from "../../../../store/lab/slice";


const DropdownButton = ({record, onOpenModal}: { record: LabTableDto, onOpenModal: Function }) => {

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
                dispatch(editLab(deletePropKey(record)))
                onOpenModal()
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'laboratorio'} id={record.id} remove={deleteLab}/>,
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

export const columns = ({filteredInfo, sortedInfo, onOpenModal}: ColumnProps): ColumnsType<LabTableDto> => [
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
        title: "Código de Sunedu",
        dataIndex: "suneduCode",
        key: "suneduCode",
        sorter: (a, b) => (a.suneduCode > b.suneduCode ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "suneduCode" ? sortedInfo.order : null,
        filteredValue: filteredInfo?.suneduCode || null,
        width: "20%",
    },
    {
        title: "Código Qr",
        dataIndex: "qrCode",
        key: "qrCode",
        sorter: (a, b) => (a.suneduCode > b.suneduCode ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "qrCode" ? sortedInfo.order : null,
        render: (text) => (
            <Popover
                overlayInnerStyle={{padding: 0}}
                content={<QRCode errorLevel="H" value={text} bordered={false}/>}
            >
                <Space>
                    <QrcodeOutlined/>
                    {text}
                </Space>
            </Popover>
        ),
    },
    {
        title: "Ubicación",
        dataIndex: "location",
        key: "location",
        sorter: (a, b) => (a.suneduCode > b.suneduCode ? 1 : -1),
        sortDirections: ["descend", "ascend"],
        sortOrder: sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
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
