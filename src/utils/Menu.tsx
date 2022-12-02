import { AppstoreOutlined, CarOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import path from "../router/path";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return { key, icon, children, label, type } as MenuItem;
}

const MenuCommon = () => {
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem("Trang chủ", path.home, <HomeOutlined />),
    getItem("Category", path.category, <AppstoreOutlined />),
    getItem("Products", path.products, <CarOutlined />),
  ];
  const handleChangeKey = (key: any) => {
    setSelectedKeys(key.key);
    navigate(key.key);
  };
  const location = useLocation();
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);
  return (
    <div>
      <Menu
        items={items}
        defaultSelectedKeys={["/"]}
        mode="inline"
        theme="dark"
        selectedKeys={[selectedKeys]}
        onSelect={handleChangeKey}
      />
    </div>
  );
};

export default MenuCommon;
