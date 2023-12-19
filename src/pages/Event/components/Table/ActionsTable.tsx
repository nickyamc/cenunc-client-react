import React from "react";
import {Button, Dropdown, MenuProps, Space} from "antd";
import {FormOutlined, MoreOutlined} from "@ant-design/icons";
import PopActionDelete from "../../../../components/Popconfirm/PopActionDelete.tsx";
import {useAppDispatch} from "../../../../utils/hooks";
import {setOne} from "../../../../store/event/slice";
import {deletePropKey} from "../../../../utils/functions/deletePropKey.ts";
import {EventDto} from "../../../../store/event/dto/event.dto.ts";

interface ActionsTableProps {
    record: any;
    setOpenModal: Function;
}

const ActionsTable: React.FC<ActionsTableProps> = (actionsTableProps: ActionsTableProps) => {

    const {record, setOpenModal} = actionsTableProps;
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
                dispatch(setOne(deletePropKey<EventDto>(record)))
                setOpenModal(true)
                console.log(`Editar: ${record.key}`);
            },
        },
        {
            label: <PopActionDelete label={'laboratotio'} record/>,
            key: "2",
            onClick: () => {
                console.log(`Eliminar: ${record.key}`);
            },
            danger: true,
        },
    ];

    return (
        <>
          <Dropdown menu={{items}} trigger={['click']}>
              <Button icon={<MoreOutlined />} size={'small'} />
          </Dropdown>
        </>
    );
};

export default ActionsTable;
