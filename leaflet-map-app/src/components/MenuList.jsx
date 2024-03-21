import React from 'react'
import { Menu } from 'antd';
import { HomeOutlined, HeatMapOutlined, WarningOutlined } from '@ant-design/icons';

const MenuList = () => {
    return (
        <Menu mode='inline' className='menu-bar'>
            <Menu.Item key="crop-classification" icon={<HeatMapOutlined />}>
            Crop Classification
            </Menu.Item>
            <Menu.Item key="early-warning" icon={<WarningOutlined />}>
            Early Warning Detection
            </Menu.Item>
            {/* <Menu.Item key="home3" icon={<HomeOutlined />}>
            Home
            </Menu.Item>
            <Menu.Item key="home4" icon={<HomeOutlined />}>
            Home
            </Menu.Item> */}
        </Menu>
    )
}

export default MenuList