import { Layout, Menu, MenuProps, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../features/Login";
import Signup from "../../features/Signup";
import { AppDispatch, RootState } from "../../store";
import Share from "../Share";
import {
  authenticate,
  getSharedVideos,
  showLogin,
  showShareVideo,
  showSignup,
  resetStore,
} from "./slice";

const { Title } = Typography;

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const showModalLogin = () => dispatch(showLogin());
  const showModalSignup = () => dispatch(showSignup());
  const showModalShareVideo = () => dispatch(showShareVideo());
  const user = useSelector((state: RootState) => state.counter.user);
  const sharedVideos = useSelector(
    (state: RootState) => state.counter.sharedVideos
  );
  console.log(sharedVideos);

  const guestItems: MenuProps["items"] = [
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
      onClick: showModalShareVideo,
    },
  ];

  useEffect(() => {
    dispatch(authenticate(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSharedVideos());
  }, [dispatch]);

  useEffect(() => {
    return function cleanup() {
      dispatch(resetStore());
    };
  }, []);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        {user ? (
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
            items={guestItems}
          />
        )}
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Content style={{ padding: "0 24px", minHeight: "100vh" }}>
            <div>
              {sharedVideos?.map((sharedVideo) => (
                <div className="mb-24" key={sharedVideo._id}>
                  <Title level={5} className="text-center">
                    Shared by: {sharedVideo.sharedBy}
                  </Title>
                  <div className="d-flex justify-content-center">
                    <iframe
                      width="640"
                      height="360"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      src={`https://www.youtube.com/embed/${
                        sharedVideo.url?.split("v=")?.[1]
                      }`}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </Content>
        </Layout>
      </Content>
      <Login />
      <Signup />
      <Share />
    </Layout>
  );
};

export default Home;
