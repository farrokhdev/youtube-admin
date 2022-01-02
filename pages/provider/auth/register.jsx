import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import RegisterController from 'extras/controllers/RegisterController'
import { useTranslation } from 'react-i18next'

const controller = new RegisterController()

const { Item } = Form

const register = observer(() => {
  const { t } = useTranslation()

  const { response, success } = controller

  console.log(response)

  return (
    <>
      {!success ? (
        <AuthLayout
          formTopic={t('provider:register.formTopic')}
          formBtn={t('provider:register.button')}
          formType="register"
          logo={'/provider.png'}
          controller={controller}
          t={t}
        >
          <Item
            className="form_item"
            name="name"
            label={t('provider:register.name')}
            rules={[{ required: true }]}
            help={(response === '' && response) || null}
            validateStatus={response === '' && 'error'}
          >
            <Input />
          </Item>
          <Item
            className="form_item"
            name="family"
            label={t('provider:register.family')}
            rules={[{ required: true }]}
            help={(response === '' && response) || null}
            validateStatus={response === '' && 'error'}
          >
            <Input />
          </Item>
          <Item
            className="form_item"
            name="email"
            label={t('provider:register.email')}
            rules={[{ required: true }, { type: 'email' }]}
            help={
              (response === 'ایمیل قبلا در سایت ثبت شده است' && response) ||
              null
            }
            validateStatus={
              response === 'ایمیل قبلا در سایت ثبت شده است' && 'error'
            }
          >
            <Input />
          </Item>
          <Item
            className="form_item"
            name="password"
            label={t('provider:register.password')}
            rules={[{ required: true }]}
            hasFeedback
            help={(response === 'validation.confirmed' && response) || null}
            validateStatus={response === 'validation.confirmed' && 'error'}
          >
            <Input.Password />
          </Item>
          <Item
            className="form_item"
            name="password_confirmation"
            label={t('provider:register.repeat_password')}
            rules={[{ required: true }]}
            hasFeedback
            help={(response === 'validation.confirmed' && response) || null}
            validateStatus={response === 'validation.confirmed' && 'error'}
          >
            <Input.Password />
          </Item>
        </AuthLayout>
      ) : (
        <AuthLayout
          formTitle={t('provider:confirm.formTitle')}
          formTopic={t('provider:confirm.formTopic')}
          formBtn={t('provider:confirm.button')}
          formType="register_done"
          logo={'/mail.png'}
          t={t}
          controller={controller}
        ></AuthLayout>
      )}
    </>
  )
})

export default register
