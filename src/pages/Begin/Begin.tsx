import React, {useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Layout, ConfigProvider, theme} from "antd";
import Header from "../../sections/Header";
import Sider from "../../sections/Sider";

const {Header: HeaderAntd, Sider: SiderAntd, Content} = Layout;

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const Begin: React.FC = () => {
    const [collapse, setCollapse] = useState(false);
    const [selectItem, setSelectItem] = useState<string>("1");
    const [collapsedWidth, setCollapsedWidth] = useState<number>(80);

    if(!isAuthenticated()) {
        return <Navigate to={'/login'} />
    }

    return (
        <Layout style={{height: "100vh"}}>
            <SiderAntd
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapse}
                style={{boxShadow: "-2px 0px 15px 1px rgba(0,0,0,0.30)"}}
                breakpoint="lg"
                onBreakpoint={(broken) => {
                    setCollapsedWidth(broken ? 0 : 80);
                    setCollapse(broken);
                }}
                collapsedWidth={collapsedWidth}
            >
                <Sider collapse={collapse} selectItem={selectItem} setSelectItem={setSelectItem}/>
            </SiderAntd>
            <Layout>
                <ConfigProvider theme={{algorithm: theme.compactAlgorithm}}>
                    <HeaderAntd
                        style={{
                            background: "#fff",
                            boxShadow: "10px -2px 15px 1px rgba(0,0,0,0.30)",
                            zIndex: 1,
                            paddingInline: "20px",
                        }}
                    >
                        <Header setCollapse={setCollapse} collapse={collapse} selectItem={selectItem}
                                setSelectItem={setSelectItem}/>
                    </HeaderAntd>
                </ConfigProvider>
                <Content
                    style={{
                        height: "100vh",
                        backgroundImage: "url('src/assets/imgs/pusharo.png')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "400px",
                        overflow: "scroll",
                    }}
                >

                    <Outlet context={{setSelectItem}}/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Begin;
