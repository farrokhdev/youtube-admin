import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import AfterRegisterController from 'extras/controllers/AfterRegisterController'

const controller = new AfterRegisterController()

const { Item } = Form

const forgot_password = observer(() => {
  const { t } = useTranslation()

  const [reg, setReg] = useState(false)

  return (
    <>
      {!controller.success ? (
        <AuthLayout
          formTitle={t('provider:forgot_password.formTitle')}
          formTopic={t('provider:forgot_password.formTopic')}
          formBtn={t('provider:forgot_password.button')}
          formType="forgot_password"
          logo={'/provider.png'}
          setReg={setReg}
          reg={reg}
          t={t}
          controller={controller}
        >
          <Item
            className="form_item"
            name="email"
            label={t('provider:forgot_password.email')}
            rules={[{ required: true }, { type: 'email' }]}
          >
            <Input />
          </Item>
          {/* <Item className="form_item">
        <p className="success align-center">{resended}</p>
      </Item> */}
        </AuthLayout>
      ) : (
        <AuthLayout
          formTopic={t('provider:confirm.formTitleForgotPass')}
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

export default forgot_password
