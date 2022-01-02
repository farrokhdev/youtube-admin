import Link from "next/link";
import { MenuItems } from "extras/localData";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/router";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar = ({ collapsed }) => {
  const router = useRouter();

  return (
    <Sider
      trigger={null}
      collapsed={collapsed}
      width={200}
      className="site-layout-background sidebar"
    >
      <Menu
        mode="inline"
        // defaultSelectedKeys={['0']}
        // defaultOpenKeys={['0']}
        style={{ height: "100%", borderLeft: 0 }}
      >
        {MenuItems.map((item, indx) => {
          if (!item.submenus) {
            return (
              <Menu.Item
                className={
                  router.pathname === item.url ? "ant-menu-item-selected" : ""
                }
                key={item.id}
                icon={item.icon}
              >
                <Link href={item.url}>{item.title}</Link>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu key={item.id} icon={item.icon} title={item.title}>
                {item.submenus.map((subItem) => {
                  return (
                    <Menu.Item
                      key={subItem.id}
                      className={
                        router.pathname === subItem.url
                          ? "ant-menu-item-selected"
                          : ""
                      }
                    >
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};
