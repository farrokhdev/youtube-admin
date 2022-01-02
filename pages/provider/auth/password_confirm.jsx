import React from 'react'
import { observer } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import AfterRegisterController from 'extras/controllers/AfterRegisterController'
import { useRouter } from 'next/router'

const controller = new AfterRegisterController()

const { Item } = Form

const password_confirm = observer(() => {
  const { t } = useTranslation()

  return (
    <AuthLayout
      formTopic={t('provider:password_confirm.formTopic')}
      formBtn={t('provider:password_confirm.button')}
      logo={'/provider.png'}
      formType="reset_password"
      t={t}
      controller={controller}
    ></AuthLayout>
  )
})

export default password_confirm
