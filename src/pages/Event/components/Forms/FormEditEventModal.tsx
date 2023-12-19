import React, {useEffect, useState} from "react";
import {
    App,
    Form,
    Input,
    Modal,
} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {EventDto} from "../../../../store/event/dto/event.dto.ts";
import {updateEvent} from "../../../../store/event/api";

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormEditEventModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const [form] = Form.useForm();
    const {message} = App.useApp()

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const event: EventDto | null = useAppSelector(state => state.event.edit);
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setConfirmLoading(true);
        const statusResponse = await dispatch(updateEvent(values.id, {
            title: values.title,
            location: values.location,
            description: values.description,
        }));
        statusResponse ?
            message.success('Evento actualizado exitosamente') :
            message.error('Error al actualizar el evento');
        form.resetFields();
        setConfirmLoading(false);
        onCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.warning('¡Por favor ingrese todos los campos necesarios!');
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(event);
    }, [event]);

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Editar Evento'}
                okText={'Editar'}
                cancelText={'Cancelar'}
                onOk={() => {
                    form.validateFields()
                        .then(onFinish)
                        .catch(onFinishFailed)
                }}
                confirmLoading={confirmLoading}
            >
                <Form
                    autoComplete={'off'}
                    form={form}
                    name={'basic'}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item
                        label={'ID'}
                        name={'id'}
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingrese un ID!'
                            }
                        ]}
                    >
                        <Input
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Titulo'}
                        name={'title'}
                        rules={[
                            {
                                required: true,
                                message:'¡Por favor ingrese un titulo!'
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
                                message:'¡Por favor ingrese la ubicación!'
                            }
                        ]}
                    >
                        <Input
                            placeholder={'Ubicación del evento'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Descripción'}
                        name={'description'}
                        rules={[
                            {
                                required: false,
                            }
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder={'Descripción del evento'}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
};

export default FormEditEventModal;