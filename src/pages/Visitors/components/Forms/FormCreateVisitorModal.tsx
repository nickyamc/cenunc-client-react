import React, {useEffect, useState} from "react";
import {
    App,
    Col,
    Form,
    Input,
    Modal, Row, Select, theme,
    Typography
} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {VisitorType} from "../../../../store/enum/visitorType.ts";
import {EventDto} from "../../../../store/event/dto/event.dto.ts";
import {createVisitor} from "../../../../store/visitor/api";
import {getAllEvent} from "../../../../store/event/api";

const {Option} = Select;
const {Text} = Typography;

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormCreateVisitorModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const {message} = App.useApp();

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const events: EventDto[] = useAppSelector(state => state.event.list);

    const [isStudent, setIsStudent] = useState<boolean>(true);

    const handleChangeRole = (value: string) => {
        setIsStudent(value == VisitorType.STUDENT);
    }

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setConfirmLoading(true);
        const statusResponse = await dispatch(createVisitor({
            account: {
                dni: values.dni,
                username: values.username,
                password: values.password,
                email: values.email,
                phone: `${values.prefixPhone}${values.phone}`,
                firstName: values.firstName,
                lastName: values.lastName,
            },
            type: values.type,
            studentCode: values.studentCode,
            university: values.university,
            faculty: values.faculty,
            career: values.career,
        }));
        statusResponse ?
            message.success('Visitante creado exitosamente') :
            message.error('Error al crear el visitante');
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

    const prefixSelector = (
        <Form.Item name="prefixPhone" noStyle>
            <Select style={{width: 70}} disabled>
                <Option value="51">+51</Option>
            </Select>
        </Form.Item>
    );

    const contentStyle: React.CSSProperties = {
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        padding: 15,
        paddingBottom: 20,
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Nuevo Visitante'}
                okText={'Crear'}
                cancelText={'Cancelar'}
                onOk={() => {
                    form.validateFields()
                        .then(onFinish)
                        .catch(onFinishFailed)
                }}
                confirmLoading={confirmLoading}
                width={950}
            >

                <Form
                    autoComplete="off"
                    form={form}
                    name={'createUser'}
                    labelCol={{span: 9}}
                    wrapperCol={{span: 15}}
                    initialValues={{
                        type: VisitorType.STUDENT,
                        prefixPhone: '51'
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col md={11}>
                            <Form.Item
                                label={'Código de estudiante'}
                                name={'studentCode'}
                                rules={[
                                    {
                                        required: isStudent,
                                        message: '¡Por favor, ingrese su código de estudiante!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input.Search />
                            </Form.Item>
                            <Form.Item
                                label={'DNI'}
                                name={'dni'}
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor, ingrese su DNI!',
                                        whitespace: true,
                                    },
                                    {
                                        min: 8,
                                        message: '¡El DNI debe tener 8 carácteres mínimo!',
                                    },
                                ]}
                            >
                                <Input placeholder={'87654321'}/>
                            </Form.Item>
                            <Form.Item
                                label={'Nombres'}
                                name={'firstName'}
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor, ingrese sus nombres!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder={'Juan'}/>
                            </Form.Item>
                            <Form.Item
                                label={'Apellidos'}
                                name={'lastName'}
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor, ingrese sus apellidos!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder={'Perez'}/>
                            </Form.Item>
                            <Form.Item
                                label={'Universidad'}
                                name={'jobTitle'}
                                rules={[
                                    {
                                        required: isStudent,
                                        message: '¡Por favor, ingrese su universidad!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'UNAMAD'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Facultad'}
                                name={'faculty'}
                                rules={[
                                    {
                                        required: isStudent,
                                        message: '¡Por favor, ingrese su facultad!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'Ingenieria'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Carrera'}
                                name={'career'}
                                rules={[
                                    {
                                        required: isStudent,
                                        message: '¡Por favor, ingrese su carrera!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'Ingenieria de Sistemas'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Eventos'}
                                name={'eventIds'}
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor seleccione un Evento!'
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
                                        }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={13}>
                            <div style={contentStyle}>
                                <div style={{marginBottom: 15}}>
                                    <Text strong>Datos de Cuenta:</Text>
                                </div>
                                <Form.Item
                                    label={'Tipo'}
                                    name={'type'}
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder={'Por favor seleccione'}
                                        onChange={handleChangeRole}
                                        options={[
                                            {
                                                label: 'Estudiante',
                                                value: VisitorType.STUDENT,
                                            },
                                            {
                                                label: 'Docente',
                                                value: VisitorType.TEACHER,
                                            },
                                            {
                                                label: 'Externo',
                                                value: VisitorType.EXTERNAL,
                                            }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={'Teléfono'}
                                    name={'phone'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '¡Por favor, ingrese su número de teléfono!',
                                            whitespace: true,
                                        },
                                        {
                                            min: 9,
                                            message: '¡El número de teléfono debe tener 9 digitos!',
                                        },
                                        {
                                            pattern: new RegExp("^[9][0-9]*$"),
                                            message: "¡El número de teléfono debe empezar con 9!",
                                        },
                                    ]}
                                >
                                    <Input type={'number'} addonBefore={prefixSelector} placeholder={'987654321'}/>
                                </Form.Item>
                                <Form.Item
                                    label={'Email'}
                                    name={'email'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '¡Por favor, ingrese sus email!',
                                            whitespace: true,
                                        },
                                        {
                                            type: 'email',
                                            message: '¡El correo electrónico no es válido!',
                                        }
                                    ]}
                                >
                                    <Input placeholder={'test@gmail.com'}/>
                                </Form.Item>
                                <Form.Item
                                    label={'Username'}
                                    name={'username'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '¡Por favor, ingrese su usuario!',
                                            whitespace: true,
                                        }
                                    ]}
                                >
                                    <Input placeholder={'nick123'}/>
                                </Form.Item>
                                <Form.Item
                                    label={'Contraseña'}
                                    name={'password'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '¡Por favor, ingrese su contraseña!',
                                            whitespace: true,
                                        },
                                        {
                                            min: 8,
                                            message: "¡La contraseña debe tener 8 carácteres mínimo!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder={'*****'}/>
                                </Form.Item>
                                <Form.Item
                                    label={'Confirmar contraseña'}
                                    name={'confirmPassword'}
                                    style={{marginBottom: 5}}
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "¡Por favor, confirme su contraseña!",
                                            whitespace: true,
                                        },
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error("¡La nueva contraseña que ingresó no coincide!")
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder={'*****'}/>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>

    );
};

export default FormCreateVisitorModal;