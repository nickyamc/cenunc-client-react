import React, {useEffect} from "react";
import {
    Form,
    Input,
    Modal,
    App,
} from "antd";
import {useAppDispatch} from "../../../../utils/hooks";
import {createEvent} from "../../../../store/event/api";

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormCreateEventModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const [form] = Form.useForm()
    const {message} = App.useApp()

    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        const statusResponse = await dispatch(createEvent(values));
        if (statusResponse) {
            message.success('Evento creado exitosamente');
        } else {
            message.error('Error al crear el evento');
        }
        form.resetFields();
        onCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.warning('¡Por favor ingrese todos los campos necesarios!');
    };

    useEffect(() => {
        form.resetFields();
    }, []);

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Nuevo Evento'}
                okText={'Crear'}
                cancelText={'Cancelar'}
                onOk={() => {
                    form.validateFields()
                        .then(onFinish)
                        .catch(onFinishFailed)
                }}
            >
                <Form
                    autoComplete="off"
                    name={'createEvent'}
                    form={form}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    initialValues={{}}
                >

                    <Form.Item
                        label={'Titulo'}
                        name={'title'}
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingrese un titulo!'
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

export default FormCreateEventModal;