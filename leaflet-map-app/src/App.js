import React from "react";
import SimpleMap from "./SimpleMap";
import { useState } from "react";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";

const { Header, Sider } = Layout;
function App() {
  const [profileData, setProfileData] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('crop-classification'); 
  
  const handleSidebarClick = e => {
    setActivePage(e.key); 
  };

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

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex' }}>
      <Sider
        width={275}
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme="light"
        className="sidebar"
      >
        {/* <Logo /> */}
        <MenuList handleSidebarClick={handleSidebarClick  } />
      </Sider>

      <Layout style={{ width: '100%' }}>
        <Header style={{ padding: 0, color: "white", backgroundColor: "#114D0D" }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "#fff" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "#fff" }} />
              )
            }
          />
          <span style={{ marginLeft: "20px", fontSize: "20px" }}>HARVEST</span>
        </Header>
        {activePage === 'crop-classification' && <SimpleMap className="simple-map" centerLatitude="-28.4275752" centerLongitude="21.6859793" />}
        {activePage === 'early-warning' && <SimpleMap className="simple-map" centerLatitude="47.47672096160886" centerLongitude="9.433863598100613" />}
      </Layout>
    </Layout>
  );
}
export default App;
