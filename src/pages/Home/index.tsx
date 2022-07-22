import { Breadcrumb, Layout, Menu, MenuProps, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../features/Login";
import Signup from "../../features/Signup";
import { AppDispatch, RootState } from "../../store";
import { authenticate, showLogin, showSignup } from "./slice";

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const showModalLogin = () => dispatch(showLogin());
  const showModalSignup = () => dispatch(showSignup());
  const user = useSelector((state: RootState) => state.counter.user);

  const guessItems: MenuProps["items"] = [
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

  const authItems: MenuProps["items"] = [
    {
      key: 1,
      label: `Share a movie`,
      onClick: showModalLogin,
    },
  ];

  useEffect(() => {
    dispatch(authenticate(null));
  }, [dispatch]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        {!user ? (
          <div className="d-flex">
            <Typography className="white">Welcome, {user}</Typography>
            <Menu
              className=""
              theme="dark"
              mode="horizontal"
              items={authItems}
            />
          </div>
        ) : (
          <Menu
            className=""
            theme="dark"
            mode="horizontal"
            items={guessItems}
          />
        )}
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
      <Login />
      <Signup />
    </Layout>
  );
};

export default Home;
