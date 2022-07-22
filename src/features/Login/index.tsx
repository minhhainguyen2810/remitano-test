import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api/apiClient";
import { authenticate, showLogin } from "../../pages/Home/slice";
import { AppDispatch, RootState } from "../../store";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const showModalLogin = () => dispatch(showLogin());
  const isShowLogin = useSelector(
    (state: RootState) => state.counter.showLogin
  );
  const loading = useSelector((state: RootState) => state.counter.loadingLogin);

  const onFinish = async (values: any) => {
    await dispatch(authenticate(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Login"
      visible={isShowLogin}
      onCancel={showModalLogin}
      footer={null}
      confirmLoading={loading}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
