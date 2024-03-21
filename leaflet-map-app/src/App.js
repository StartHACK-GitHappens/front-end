import React from "react";
import SimpleMap from "./SimpleMap";
import { useState } from "react";
import axios from "axios";
import L from "leaflet";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import Logo from './components/Logo'
import MenuList from './components/MenuList'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { Header, Sider } = Layout;
function App() {
 const [profileData, setProfileData] = useState(null);
 const [collapsed, setCollapsed] = useState(false);

  function getHumidityDailyAvg() {
    axios({
      method: "GET",
      url: "/forecast/humidityDailyAvg",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          humidity: res.humidity,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const {
     token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className='sidebar'
      >
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            className='toggle'
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ?
            <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
      </Layout>
      <SimpleMap className="simple-map" />
    </Layout>
  );
}
export default App;
