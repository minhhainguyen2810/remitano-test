import { Button, Form, Input } from "antd";
import axios from "axios";
import apiClient from "../../api/apiClient";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("run");

    apiClient
      .post("/user/authenticate", values)
      .then((res) => {
        axios.get("https://minhnguyen-be.herokuapp.com/user/all");
      })
      .catch((err) => {
        // setError(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
  );
};

export default Login;
