import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Modal, Select, App
} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {updateLab} from "../../../../store/lab/api";
import {LabDto} from "../../../../store/lab/dto/lab.dto.ts";
//import {getAllEvent} from "../../../../store/event/api";

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormEditLabModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const [form] = Form.useForm()
    const {message} = App.useApp()

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const lab: LabDto | null = useAppSelector(state => state.lab.edit);
    const events = useAppSelector(state => state.event.list);

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setConfirmLoading(true);
        const statusResponse = await dispatch(updateLab(values.id, {
            suneduCode: values.suneduCode,
            location: values.location,
            eventIds: values.eventIds,
        }));
        statusResponse ?
            message.success('Laboratorio actualizado exitosamente') :
            message.error('Error al actualizar el laboratorio');
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
        form.setFieldsValue(lab);
    }, [lab]);

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Editar Laboratorio'}
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

export default FormEditLabModal;