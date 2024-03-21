import React from 'react';
import SimpleMap from './SimpleMap';
import { useState } from 'react';
import axios from "axios";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import Logo from './components/Logo'
import MenuList from './components/MenuList'

const { Header, Sider } = Layout;
function App() {
   // new line start
   const [profileData, setProfileData] = useState(null);
   const [collapsed, setCollapsed] = useState(false);

   function getHumidityDailyAvg() {
     axios({
       method: "GET",
       url:"/forecast/humidityDailyAvg",
     })
     .then((response) => {
       const res =response.data
       setProfileData(({
         humidity: res.humidity}))
     }).catch((error) => {
       if (error.response) {
         console.log(error.response)
         console.log(error.response.status)
         console.log(error.response.headers)
         }
     })}

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
        <Header style={{ padding: 0, color: "white" }}>
          <Button
            type='text'
            className='toggle'
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ?
            <MenuUnfoldOutlined style={{ color: '#fff' }} /> : <MenuFoldOutlined style={{ color: '#fff' }} />}
          />
          <span style={{marginLeft: "20px", fontSize: "20px"}}>HARVEST</span>
        </Header>
        <SimpleMap className="simple-map" />
      </Layout>
    </Layout>
  );
}
export default App;