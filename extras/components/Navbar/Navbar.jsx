import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from '@ant-design/icons'
import { Menu, Dropdown, Drawer, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { observer, inject } from 'mobx-react'
import Router from 'next/router'
import RegisterController from 'extras/controllers/RegisterController'
import { useTranslation } from 'react-i18next'
import { MobileDrawer } from './MobileDrawer'

const regController = new RegisterController()

export const Navbar = inject('coreProviderStore')(
  observer(({ coreProviderStore, collapsed, setCollapsed }) => {
    const { t } = useTranslation()
    // DRAWER
    const [visible, setVisible] = useState(false)
    const showDrawer = () => {
      setVisible(true)
    }
    const onClose = () => {
      setVisible(false)
    }

    const logoutHandler = () => {
      regController.logout()
    }

    const menu = (
      <Menu>
        {/* <Menu.Item key="100">
          <Link target="_blank" href="/provider/auth/login">
            {t('provider:navbar.login')}
          </Link>
        </Menu.Item>
        <Menu.Item key="101">
          <Link target="_blank" href="/provider/auth/register">
            {t('provider:navbar.register')}
          </Link>
        </Menu.Item> */}
        <Menu.Item key="102">
          <Link onClick={logoutHandler} href="/provider/auth/login">
            {t('provider:navbar.logout')}
          </Link>
        </Menu.Item>
      </Menu>
    )

    // route to dashboard
    const routerHandler = () => {
      Router.push('/provider/dashboard')
    }

    const toggle = (e) => {
      e.preventDefault()
      setCollapsed(!collapsed)
    }

    const notHandler = () => {
      Router.push('/provider/notifications')
    }
    return (
      <>
        <MobileDrawer onClose={onClose} visible={visible} />

        <div className="navbar">
          <div className="logo">
            <Image
              className="logo"
              src="/youtube.png"
              height={60}
              width={120}
              objectFit="cover"
              objectPosition={'center'}
              onClick={routerHandler}
            />
          </div>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger toggle switch',
              onClick: toggle,
            },
          )}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger toggle drawerbtn',
              onClick: showDrawer,
            },
          )}

          <div className="welcome-user">
            <span className="provider">
              {coreProviderStore.provider.fullname}
            </span>
            <span>{t('provider:navbar.wellcome')}</span>
          </div>
          <div className="profile">
            <div className="notification">
              <BellOutlined />
              {coreProviderStore.count > 0 && (
                <div className="notif-count" onClick={notHandler}>
                  {coreProviderStore.count}
                </div>
              )}
            </div>
            <div className="profile_img">
              <img src="/person.jpg" />
            </div>
            <Dropdown
              overlay={menu}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <DownOutlined />
            </Dropdown>
          </div>
        </div>
      </>
    )
  }),
)
