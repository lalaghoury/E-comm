import React, { useEffect, useState } from "react";
import "./AdminLayout.scss";
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  EditOutlined,
  InfoCircleTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    const urlArray = url.split("/");
    const selectedKeyFromURL = urlArray[urlArray.length - 1];
    setSelectedKey(selectedKeyFromURL);
  }, [navigate]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo2 dis-fcc cursor" onClick={() => navigate("/")}>
          <h2>
            <span className="lg-logo cursor">Euphoria</span>
            <span className="sm-logo cursor">Eu</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey === "dashboard" ? "" : selectedKey]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              setSelectedKey(key);
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "orders",
              icon: <ProfileOutlined />,
              label: "Orders",
              children: [
                {
                  key: "orders/orders-list",
                  icon: <ProfileOutlined />,
                  label: "Orders",
                },
              ],
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Users",
              children: [
                {
                  key: "users/all-users-list",
                  icon: <AppstoreAddOutlined />,
                  label: "All Users List",
                },
                {
                  key: "users/add-user",
                  icon: <PlusSquareOutlined />,
                  label: "Create User",
                },
                {
                  key: "users/details/:id",
                  icon: <InfoCircleTwoTone />,
                  label: "User Details",
                },
              ],
            },
            {
              icon: <AppstoreAddOutlined />,
              label: "Products",
              key: "products",
              children: [
                {
                  key: "products/products-list",
                  icon: <AppstoreAddOutlined />,
                  label: "All Products List",
                },
                {
                  key: "products/add-product",
                  icon: <PlusSquareOutlined />,
                  label: "Add Product",
                },
                {
                  key: "products/edit-product/:id",
                  icon: <EditOutlined />,
                  label: "Edit Product",
                },
              ],
            },
            {
              key: "categories/list",
              icon: <AppstoreAddOutlined />,
              label: "Categories",
              children: [
                {
                  key: "categories/categories-list",
                  icon: <AppstoreAddOutlined />,
                  label: "All Categories List",
                },
                {
                  key: "categories/add-category",
                  icon: <PlusSquareOutlined />,
                  label: "Add Category",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
