import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: 1,
    label: `Login`,
  },
  {
    key: 2,
    label: `Sign up`,
  },
];

const App: React.FC = () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu className="" theme="dark" mode="horizontal" items={items1} />
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>Content</Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default App;
