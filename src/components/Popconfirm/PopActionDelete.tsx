import {Popconfirm, Space, App} from "antd";
import React, {useState} from "react";
import {DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../utils/hooks";
import {AppDispatch} from "../../store";

interface PopActionDeleteProps {
    label: string;
    id: number;
    remove: (id: number) => (dispatch: AppDispatch) => Promise<boolean>;
}

const PopActionDelete: React.FC<PopActionDeleteProps> = (popActionDeleteProps: PopActionDeleteProps) => {

    const {label, id, remove} = popActionDeleteProps;

    const {message} = App.useApp()

    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const handleDelete = async () => {
        setLoading(true);
        const statusResponse = await dispatch(remove(id))
        setLoading(false);
        setOpen(false)
        statusResponse ?
            message.success(`¡${label[0] + label.substring(1)} eliminado exitosamente!`)
            :
            message.error(`¡Error al eliminar el ${label}!`);

    }

    return (
        <>
            <Popconfirm
                open={open}
                title={`Eliminar el ${label}`}
                description={`¿Estás seguro de eliminar este registro?`}
                okButtonProps={{loading: loading}}
                onCancel={() => setOpen(false)}
                onConfirm={handleDelete}
                placement={'left'}
                icon={<QuestionCircleOutlined style={{color: "red"}}/>}
            >
                <Space style={{width: "100%"}} onClick={() => setOpen(true)}>
                    <DeleteOutlined/>
                    Eliminar
                </Space>
            </Popconfirm>
        </>
    );
};

export default PopActionDelete;