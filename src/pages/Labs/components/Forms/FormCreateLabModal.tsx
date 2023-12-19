import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Modal, Select, App
} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {createLab} from "../../../../store/lab/api";
import {getAllEvent} from "../../../../store/event/api";

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormCreateLabModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const [form] = Form.useForm()
    const {message} = App.useApp()

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const events = useAppSelector(state => state.event.list);

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setConfirmLoading(true);
        const statusResponse = await dispatch(createLab(values));
        statusResponse ?
            message.success('Laboratorio creado exitosamente') :
            message.error('Error al crear el laboratorio');
        form.resetFields();
        setConfirmLoading(false);
        onCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.warning('¡Por favor ingrese todos los campos necesarios!');
    };

    useEffect(() => {
        dispatch(getAllEvent());
    }, []);

    useEffect(() => {
        const eventDefault = events.find((event) => event.title === 'CUCs');
        form.setFieldsValue({'eventIds': [eventDefault?.id]});
    }, [events]);

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Nuevo Laboratorio'}
                okText={'Crear'}
                cancelText={'Cancelar'}
                onOk={() => {
                    form.validateFields()
                        .then(onFinish)
                        .catch(onFinishFailed)
                }}
                confirmLoading={confirmLoading}
            >
                <Form
                    autoComplete="off"
                    form={form}
                    name={'createLab'}
                    labelCol={{span: 7}}
                    wrapperCol={{span: 17}}
                    initialValues={{
                        eventIds: [events.find((event) => event.title === 'CUCs')?.id]
                    }}
                >
                    <Form.Item
                        label={'Código de Sunedu'}
                        name={'suneduCode'}
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingrese un código!'
                            }
                        ]}
                    >
                        <Input
                            placeholder={'Titulo del evento'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Ubicación'}
                        name={'location'}
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingrese la ubicación!'
                            }
                        ]}
                    >
                        <Input
                            placeholder={'Ubicación del evento'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Eventos'}
                        name={'eventIds'}
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <Select
                            mode={'multiple'}
                            allowClear
                            placeholder={'Por favor seleccione'}
                            options={
                                events.map((event) => ({
                                    label: event.title,
                                    value: event.id,
                                }))
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
};

export default FormCreateLabModal;