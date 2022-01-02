import React from 'react'
import { Drawer, Menu } from 'antd'
import { MenuItems } from 'extras/localData'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const { SubMenu } = Menu

export const MobileDrawer = ({ onClose, visible }) => {
  const router = useRouter()
  return (
    <>
      <Drawer
        title={
          <Image className="logo" src="/youtube.svg" height={100} width={200} />
        }
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Menu
          mode="inline"
          // defaultSelectedKeys={['0']}
          // defaultOpenKeys={['0']}
          style={{ height: '100%', borderLeft: 0 }}
        >
          {MenuItems.map((item) => {
            if (!item.submenus) {
              return (
                <Menu.Item
                  className={
                    router.pathname === item.url ? 'ant-menu-item-selected' : ''
                  }
                  key={item.id}
                  icon={item.icon}
                >
                  <Link href={item.url}>{item.title}</Link>
                </Menu.Item>
              )
            } else {
              return (
                <SubMenu icon={item.icon} title={item.title}>
                  {item.submenus.map((subItem) => {
                    return (
                      <Menu.Item
                        key={subItem.id}
                        className={
                          router.pathname === subItem.url
                            ? 'ant-menu-item-selected'
                            : ''
                        }
                      >
                        <Link href={subItem.url}>{subItem.title}</Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            }
          })}
        </Menu>
      </Drawer>
    </>
  )
}
