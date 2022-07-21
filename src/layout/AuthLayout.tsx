import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import React from "react";
import { Outlet } from "react-router";

const { Header, Content, Footer } = Layout;

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

const AuthLayout: React.FC = () => (
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
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default AuthLayout;
