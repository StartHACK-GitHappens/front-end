import React from "react";
import SimpleMap from "./SimpleMap";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import MenuList from "./components/MenuList";

const { Header, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [activePage, setActivePage] = useState('crop-classification'); 
  
  const handleSidebarClick = e => {
    setActivePage(e.key); 
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sider
        width={275}
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme="light"
        className="sidebar"
      >
        <div style={{ padding: "10px", textAlign: "center" }}>
          {activePage === "early-warning" ? (
            <>
              <img
                src="/swiss.jpg" // Ensure the correct path to your Swiss flag image
                alt="Swiss Flag"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                St. Gallen
              </div>
            </>
          ) : (
            <>
              <img
                src="/africa.jpg" // Ensure the correct path to your South African flag image
                alt="South African Flag"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                South Africa
              </div>
            </>
          )}
        </div>
        <MenuList handleSidebarClick={handleSidebarClick} />
      </Sider>

      <Layout style={{ width: "100%" }}>
        <Header
          style={{ padding: 0, color: "white", backgroundColor: "#114D0D" }}
        >
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
          <span
            style={{
              marginLeft: "20px",
              fontSize: "20px",
              fontFamily: "Montserrat",
            }}
          >
            HARVEST
          </span>
        </Header>
        {activePage === "crop-classification" && (
          <SimpleMap
            className="simple-map"
            centerLatitude="-28.4275752"
            centerLongitude="21.6859793"
            hideFilters="false"
          />
        )}
        {activePage === "early-warning" && (
          <SimpleMap
            className="simple-map"
            centerLatitude="47.47672096160886"
            centerLongitude="9.433863598100613"
            hideFilters="true"
          />
        )}
      </Layout>
    </Layout>
  );
}

export default App;
