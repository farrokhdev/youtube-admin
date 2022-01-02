import React from 'react'
import { observer, inject } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import RegisterController from 'extras/controllers/RegisterController'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import NotificationController from 'extras/controllers/NotificationController'

const controller = new RegisterController()
const notController = new NotificationController()

const { Item } = Form

const login = observer(() => {
  const { t } = useTranslation()

  const { response, success } = controller

  return (
    <>
      <AuthLayout
        formTopic={t('provider:login.formTopic')}
        formBtn={t('provider:login.button')}
        formType="login"
        logo={'/provider.png'}
        controller={controller}
        t={t}
      >
        <Item
          className="form_item"
          name="email"
          label={t('provider:login.email')}
          rules={[{ required: true }, { type: 'email' }]}
          help={(response === '' && response) || null}
          validateStatus={response === '' && 'error'}
        >
          <Input />
        </Item>
        <Item
          className="form_item"
          name="password"
          label={t('provider:login.password')}
          rules={[{ required: true }]}
          hasFeedback
          help={(response === '' && response) || null}
          validateStatus={response === '' && 'error'}
        >
          <Input.Password />
        </Item>
      </AuthLayout>
    </>
  )
})

export default login
