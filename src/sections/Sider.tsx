import React, {} from "react";
import { Menu } from "antd";
import LogoUnamad from "../assets/imgs/logo_unamad.png";
import LogoUnamadText from "../assets/imgs/logo_unamad_text.png";
import items from "../utils/functions/menuItemList";

// import { useNavigate, useLocation } from 'react-router-dom'

type SiderProps = {
  collapse: boolean;
  selectItem: string;
  setSelectItem: (key: string) => void;
};

const Sider: React.FC<SiderProps> = ({ collapse, selectItem, setSelectItem }) => {

  //const location = useLocation();

  // useEffect(() => {setSelectItem("/users")}, [location.pathname]);
  return (
    <>
      <div style={{ textAlign: "center", margin: "10px 0" }}>
        <img
          src={collapse ? LogoUnamad : LogoUnamadText}
          height={collapse ? 40 : 47}
        />
      </div>
      <Menu
        theme="light"
        // defaultSelectedKeys={["1"]}
        selectedKeys={[selectItem]}

        mode="inline"
        items={items(true, setSelectItem)}
      />
    </>
  );
};

export default Sider;
