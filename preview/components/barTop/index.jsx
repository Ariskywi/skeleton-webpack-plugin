import React from 'react';
import { Dropdown, Menu, Button } from 'antd'; // 假设使用 Ant Design 组件
import 'antd/dist/antd.css'; // 引入 Ant Design 的样式文件
import 'index.css';

const BarTop = ({ dropDownRoutes, currentRoute, preview, genShell, select }) => {
    const handleDropdownSelect = (item) => {
        select(item);
    };

    const menu = (
        <Menu onClick={(e) => handleDropdownSelect(e.key)}>
            {dropDownRoutes.map((route, index) => (
                <Menu.Item key={index}>{route.url}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="bar-top">
            <div className="logo">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-skeleton"></use>
                </svg>
            </div>
            <div className="logo-text">Page Skeleton</div>
            <ul className="documents">
                <li><a href="https://github.com/ElemeFE/page-skeleton-webpack-plugin" target="_blank" rel="noopener noreferrer">Documents</a></li>
                <li><a href="https://zhuanlan.zhihu.com/p/34702561" target="_blank" rel="noopener noreferrer">Blog</a></li>
            </ul>
            <div className="tools">
                <div className="routes-dropdown">
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                        <Button size="small" type="primary" split>
                            {'Routes: ' + currentRoute}
                        </Button>
                    </Dropdown>
                </div>
                <Button type="success" icon="mobile" shape="circle" onClick={preview}></Button>
                <Button type="primary" icon="edit" shape="circle" onClick={genShell}></Button>
            </div>
        </div>
    );
};

export default BarTop;