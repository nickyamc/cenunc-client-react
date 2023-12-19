import React from "react";
import {Navbar} from "../components";
import {Drawer, Menu} from "antd";
import items from "../utils/functions/menuItemList";

const Header: React.FC<{
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
    collapse: boolean;
    selectItem: string;
    setSelectItem: (key: string) => void;
}> = ({setCollapse, collapse, selectItem, setSelectItem}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Navbar
                setCollapse={setCollapse}
                collapse={collapse}
                openDrawer={setOpen}
            />
            <Drawer
                placement="left"
                open={open}
                onClose={() => setOpen(false)}
                width={200}
                closable={false}
            >
                <Menu
                    theme="light"
                    selectedKeys={[selectItem]}
                    mode="inline"
                    items={items(true, setSelectItem, setOpen)}
                    onClickCapture={() => setOpen(false)}
                />
            </Drawer>
        </>
    );
};

export default Header;
