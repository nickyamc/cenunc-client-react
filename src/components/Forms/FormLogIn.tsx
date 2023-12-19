import React, {CSSProperties} from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Space,
    Tooltip,
    Typography,
    theme,
    App
} from "antd";
import {
    FacebookFilled,
    GoogleCircleFilled,
    InfoCircleOutlined,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import LogoCucs from "../../assets/svgs/logo_cucs.svg";
import axios from "axios";

const {useToken} = theme;

const {Title, Text} = Typography;

const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

const FormLogIn: React.FC = () => {
    const {token} = useToken();

    const {message} = App.useApp()

    const [form] = Form.useForm()

    const navigate = useNavigate();

    const [loading, setLoading] = React.useState<boolean>(false);

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        setLoading(true);
        message.open({
            key: 'login',
            type: "loading",
            content: "Identificando",
            duration: 1000,
        })
        await axios.post('https://cenun-api-render.onrender.com/api/auth/login/user', {
            username: values.username,
            password: values.password
        }).then((response) => response.data)
            .then((data) => {
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('profile', JSON.stringify(data.user))
                message.open({
                    key: 'login',
                    type: "success",
                    content: "Identificado",
                    duration: 3
                })
                navigate('/')
            })
            .catch(() => {
                message.open({
                    key: 'login',
                    type: "error",
                    content: "Error",
                    duration: 3
                })
            })
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <Form
                name="logIn"
                form={form}
                style={{width: "100%", maxWidth: "380px", margin: "20px 0"}}
                initialValues={{remember: false}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "24px 0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <img src={LogoCucs} width={50}/>
                        <Title level={1} style={{margin: 0}}>
                            Cenunc
                        </Title>
                    </div>
                    <Text type="secondary">Plataforma de Gestion de las CUCs.</Text>
                </div>

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "¡Por favor ingrese su nombre de usuario!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Nombre de Usuario o Email"
                        prefix={<UserOutlined style={{color: "rgba(0,0,0,.55)"}}/>}
                        suffix={
                            <Tooltip title="En caso de estudiante interno, su codigo de estudiante.">
                                <InfoCircleOutlined style={{color: "rgba(0,0,0,.45)"}}/>
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {required: true, message: "¡Por favor ingrese su contraseña!"},
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Contraseña"
                        prefix={<LockOutlined style={{color: "rgba(0,0,0,.55)"}}/>}
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Recuérdame</Checkbox>
                    </Form.Item>

                    <Link
                        to={"register"}
                        style={{float: "right", color: token.colorPrimary}}
                    >
                        ¿Has olvidado la contraseña?
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Space direction="vertical" style={{display: "flex"}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{width: "100%"}}
                            size="large"
                            loading={loading}
                        >
                            Iniciar Sesión
                        </Button>

                        <Link to={"/register"}>
                            <Button type="default" style={{width: "100%"}} size="large">
                                ¡Registrate ahora!
                            </Button>
                        </Link>
                    </Space>
                </Form.Item>
                <Space style={{display: "flex", justifyContent: "center"}}>
                    <FacebookFilled style={iconStyles}/>
                    <GoogleCircleFilled style={iconStyles}/>
                </Space>
            </Form>
        </>
    );
};

export default FormLogIn;
