import {
  AppstoreAddOutlined,
  BookOutlined, ControlOutlined,
  FundProjectionScreenOutlined,
  PieChartOutlined,
  QrcodeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link, NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items = (
  user: boolean,
  setSelectItem: (key: string) => void,
  closeDrawer?: (open: boolean) => void
): MenuItem[] => [
  {
    label: <NavLink to={"/"}>Dashboard</NavLink>,
    key: "1",
    icon: <PieChartOutlined />,
    onClick: () => {
      if (closeDrawer) closeDrawer(false);
      setSelectItem("1");
    },
  },
  {
    label: "Asistencia",
    key: "2",
    icon: <BookOutlined />,
    children: [
      {
        label: <Link to={"/attendances"}>Registros</Link>,
        key: "2.1",
        onClick: () => setSelectItem("2.1"),
      },
      {
        label: "Historial",
        key: "2.2",
        onClick: () => setSelectItem("2.2"),
      },
    ],
  },
  (function (): MenuItem {
    return user
      ? ({
          label: <NavLink to={"/users"}>Usuarios</NavLink>,
          key: "3",
          icon: <TeamOutlined />,
          onClick: () => setSelectItem("3"),
        } as MenuItem)
      : null;
  })(),
  {
    label: <Link to={"/customers"}>Visitantes</Link>,
    key: "4",
    icon: <TeamOutlined />,
    onClick: () => setSelectItem("4"),
  },
  (function (): MenuItem {
    return user
      ? ({
          label: <Link to={"/labs"}>Laboratorios</Link>,
          key: "5",
          icon: <AppstoreAddOutlined />,
          onClick: () => setSelectItem("5"),
        } as MenuItem)
      : null;
  })(),
  {
    label: "Sesiones",
    key: "6",
    icon: <ControlOutlined />,
    children: [
      {
        label: <Link to={"/sessions"}>Historial</Link>,
        icon: <BookOutlined />,
        key: "6.1",
        onClick: () => setSelectItem("6.1"),
      },
      {
        label: <Link to={"/sessions/qr"}>Generar QR</Link>,
        icon: <QrcodeOutlined />,
        key: "6.2",
        onClick: () => setSelectItem("6.2"),
      },
    ],
  },
  (function (): MenuItem {
    return user
      ? ({
          label: <Link to={"/events"}>Eventos</Link>,
          key: "7",
          icon: <FundProjectionScreenOutlined />,
          onClick: () => setSelectItem("7"),
        } as MenuItem)
      : null;
  })(),
  {
    label: "Configuraciones",
    key: "8",
    icon: <SettingOutlined />,
    onClick: () => setSelectItem("8"),
  },
];

export default items;
