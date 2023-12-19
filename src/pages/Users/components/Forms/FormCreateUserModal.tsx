import React, {useEffect, useState} from "react";
import {
    App,
    Col,
    DatePicker,
    Form,
    Input,
    Modal, Row, Select, theme,
    Typography
} from "antd";
import {UserRole} from "../../../../store/enum/userRole.ts";
import {LabDto} from "../../../../store/lab/dto/lab.dto.ts";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {createUser} from "../../../../store/user/api";
import {getAllLab} from "../../../../store/lab/api";

const {Option} = Select;
const {Text} = Typography;

interface FormModalProps {
    open: boolean;
    onCancel: () => void;
}

const FormCreateUserModal: React.FC<FormModalProps> = (formModalProps: FormModalProps) => {

    const {open, onCancel} = formModalProps;

    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const {message} = App.useApp();

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const labs: LabDto[] = useAppSelector(state => state.lab.list);

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const handleChangeRole = (value: string) => {
        setIsAdmin(value == UserRole.ADMIN)
    }

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setConfirmLoading(true);
        const statusResponse = await dispatch(createUser({
            account: {
                dni: values.dni,
                username: values.username,
                password: values.password,
                email: values.email,
                phone: `${values.prefixPhone}${values.phone}`,
                firstName: values.firstName,
                lastName: values.lastName,
            },
            role: values.role,
            jobTitle: values.jobTitle,
            denomination: values.denomination,
            birthdate: values.birthdate,
            labId: values.labId,
        }));
        statusResponse ?
            message.success('Usuario creado exitosamente') :
            message.error('Error al crear el usuario');
        form.resetFields();
        setConfirmLoading(false);
        onCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.warning('¡Por favor ingrese todos los campos necesarios!');
    };

    useEffect(() => {
        dispatch(getAllLab());
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
        marginBottom: 15,
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={'Nuevo Usuario'}
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
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                    initialValues={{
                        role: UserRole.EMPLOYEE,
                        prefixPhone: '51'
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col md={12}>

                            <div style={contentStyle}>
                                <div style={{marginBottom: 15}}>
                                    <Text strong>Datos de Cuenta:</Text>
                                </div>
                                <Form.Item
                                    label={'Role'}
                                    name={'role'}
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
                                        //defaultValue={UserRole.EMPLOYEE as string}
                                        options={[
                                            {
                                                label: 'admin',
                                                value: UserRole.ADMIN,
                                            },
                                            {
                                                label: 'employee',
                                                value: UserRole.EMPLOYEE,
                                            },
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
                        <Col md={12}>
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
                                label={'Titulo Universitario'}
                                name={'jobTitle'}
                                required={false}
                            >
                                <Input
                                    placeholder={'Ingeniero de Sistemas'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Denominación'}
                                name={'denomination'}
                                required={false}
                            >
                                <Input
                                    placeholder={'Especialista Informático'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Fecha de Nacimiento'}
                                name={'birthdate'}
                                required={false}
                            >
                                <DatePicker
                                    placeholder={'2000-01-01'}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Laboratorio'}
                                name={'labId'}
                                rules={[
                                    {
                                        required: !isAdmin,
                                        message: '¡Por favor seleccione un laboratorio!'
                                    }
                                ]}
                            >
                                <Select
                                    allowClear
                                    placeholder={'Por favor seleccione'}
                                    options={
                                        labs.map((lab) => ({
                                            label: lab.suneduCode,
                                            value: lab.id,
                                        }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>

    );
};

export default FormCreateUserModal;