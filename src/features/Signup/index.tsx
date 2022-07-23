import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, register, showSignup } from "../../pages/Home/slice";
import { AppDispatch, RootState } from "../../store";

const Signup = () => {
  const dispatch: AppDispatch = useDispatch();
  const showModalSignup = () => dispatch(showSignup());
  const isShowSignup = useSelector(
    (state: RootState) => state.counter.showSignup
  );
  const loading = useSelector(
    (state: RootState) => state.counter.loadingSignup
  );

  const onFinish = async (values: any) => {
    await dispatch(register(values));
    await dispatch(authenticate(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Sign up"
      visible={isShowSignup}
      onCancel={showModalSignup}
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
          <Input data-testid="signup" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password data-testid="signup-pwd" />
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

export default Signup;
