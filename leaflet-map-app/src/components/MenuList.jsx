import React from 'react'
import { Menu } from 'antd';
import { HomeOutlined, HeatMapOutlined, WarningOutlined } from '@ant-design/icons';

const MenuList = ({ handleSidebarClick }) => {
    return (
        <Menu mode='inline' className='menu-bar' onClick={handleSidebarClick} theme={'light'}>
            <Menu.Item key="crop-classification" icon={<HeatMapOutlined />}>
            Crop Classification
            </Menu.Item>
            <Menu.Item key="early-warning" icon={<WarningOutlined />}>
            Early Warning Detection
            </Menu.Item>
        </Menu>
    )
}

export default MenuList