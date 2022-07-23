import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getSharedVideos,
  shareVideo,
  showShareVideo,
} from "../../pages/Home/slice";
import { AppDispatch, RootState } from "../../store";

const Share = () => {
  const dispatch: AppDispatch = useDispatch();
  const showModalShareVideo = () => dispatch(showShareVideo());
  const isShow = useSelector(
    (state: RootState) => state.counter.showShareVideo
  );
  const user = useSelector((state: RootState) => state.counter.user);
  const loading = useSelector(
    (state: RootState) => state.counter.loadingShareVideo
  );

  const onFinish = async (values: any) => {
    await dispatch(shareVideo({ url: values.url, sharedBy: user }));
    await dispatch(getSharedVideos());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Share a movie"
      visible={isShow}
      onCancel={showModalShareVideo}
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
          label="Url"
          name="url"
          rules={[
            { required: true, message: "Please input your Youtube Url!" },
          ]}
        >
          <Input placeholder="https://www.youtube.com/watch?v=4KVIFNJ7mDQ" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Share
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Share;
