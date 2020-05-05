import React, { FC, useState } from 'react';
import { styled } from '@/utils';
import { Layout, Menu } from 'antd';
import Icon, { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '@/Routes';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Sider, Content } = Layout;

interface OwnProps {}

type Props = OwnProps;

const LayoutProvider: FC<Props> = ({ children }) => {
    const [collapsed, toggleCollapsed] = useState(true);
    const [collapsedWidth, setCollapsedWidth] = useState(0);

    const location = useLocation();

    const routeComponents = routes.map(({ path, name, routes, icon, key }) => {
        if (!routes.length) {
            return (
                <Menu.Item key={path}>
                    <Link to={path}>
                        <Icon component={icon as any} />
                        <span>{name}</span>
                    </Link>
                </Menu.Item>
            );
        }
        return (
            <SubMenu
                key={key}
                title={
                    <span>
                        <Icon component={icon as any} />
                        <span>{name}</span>
                    </span>
                }
            >
                {routes.map(route => (
                    <Menu.Item key={route.path}>
                        <Link to={route.path}>
                            <Icon component={route.icon as any} />
                            <span>{route.name}</span>
                        </Link>
                    </Menu.Item>
                ))}
            </SubMenu>
        );
    });

    return (
        <MainWrapper>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null}
                    breakpoint="md"
                    collapsible
                    width="250"
                    collapsed={collapsed}
                    collapsedWidth={collapsedWidth}
                    onBreakpoint={broken => {
                        if (broken) {
                            setCollapsedWidth(0);
                        } else setCollapsedWidth(80);
                    }}
                >
                    <LogoWrapper>
                        <img className={`logo ${collapsed && 'collapsed'}`} src={logo} alt="EXELO" />
                    </LogoWrapper>
                    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                        {routeComponents}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(true ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => toggleCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </MainWrapper>
    );
};

const MainWrapper = styled.div`
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }

    .ant-menu-submenu-title {
        span {
            display: flex;
            align-items: center;
        }
    }
    .ant-menu-item {
        a {
            display: flex;
            align-items: center;
        }
    }
`;

const LogoWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    .logo {
        height: 54px;
        margin: 16px 0;
    }

    .collapsed {
        display: none;
    }
`;

export default LayoutProvider;
