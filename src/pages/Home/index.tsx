import { Breadcrumb, Layout, Menu, MenuProps, Modal } from "antd";
import React, { useState } from "react";
import Login from "../../features/Login";
import Signup from "../../features/Signup";

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const showModalLogin = () => {
    setIsShowLogin(true);
  };

  const handleCancelLogin = () => {
    setIsShowLogin(false);
  };

  const [isShowSignup, setIsShowSignup] = useState(false);

  const showModalSignup = () => {
    setIsShowSignup(true);
  };

  const handleCancelSignup = () => {
    setIsShowSignup(false);
  };

  const items1: MenuProps["items"] = [
    {
      key: 1,
      label: `Login`,
      onClick: showModalLogin,
    },
    {
      key: 2,
      label: `Sign up`,
      onClick: showModalSignup,
    },
  ];

  return (
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
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
      <Modal
        title="Login"
        visible={isShowLogin}
        onCancel={handleCancelLogin}
        footer={null}
      >
        <Login />
      </Modal>
      <Modal
        title="Login"
        visible={isShowSignup}
        onCancel={handleCancelSignup}
        footer={null}
      >
        <Signup />
      </Modal>
    </Layout>
  );
};

export default Home;
