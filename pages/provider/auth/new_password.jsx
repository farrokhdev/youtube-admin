import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import AfterRegisterController from 'extras/controllers/AfterRegisterController'
import { useRouter } from 'next/router'
import Router from 'next/router'

const { Item } = Form

const controller = new AfterRegisterController()

const new_password = observer(() => {
  const router = useRouter()
  const query = router.query
  const status = router.query.status

  const { t } = useTranslation()
  useEffect(() => {
    if (status !== 'ok') {
      router.push('/provider/dashboard')
    }
  }, [status])

  return (
    <AuthLayout
      formTitle={t('provider:new_password.formTitle')}
      formTopic={t('provider:new_password.formTopic')}
      formBtn={t('provider:new_password.button')}
      formType="new_password"
      logo={'/provider.png'}
      query={query}
      t={t}
      controller={controller}
    >
      <Item
        className="form_item"
        name="password"
        label={t('provider:new_password.password')}
        rules={[{ required: true }]}
        hasFeedback
      >
        <Input.Password />
      </Item>
      <Item
        className="form_item"
        name="password_confirmation"
        label={t('provider:new_password.repeat_password')}
        rules={[{ required: true }]}
        hasFeedback
      >
        <Input.Password />
      </Item>
    </AuthLayout>
  )
})

export default new_password
