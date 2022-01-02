import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { AuthLayout } from 'extras/Layout/AuthLayout'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import AfterRegisterController from 'extras/controllers/AfterRegisterController'
import { useRouter } from 'next/router'

const controller = new AfterRegisterController()

const { Item } = Form

const register_confirm = observer(() => {
  const router = useRouter()
  let status = router.query.status

  console.log(status)

  const { t } = useTranslation()

  useEffect(() => {
    if (!status) {
      router.push('/provider/dashboard')
    }
  }, [status])

  return (
    <>
      {status === 'error' ? (
        <AuthLayout
          formTitle={t('provider:register_confirm.formTitleError')}
          formTopic={t('provider:register_confirm.formTopiceError')}
          formBtn={t('provider:register_confirm.buttonError')}
          formType="register_error"
          t={t}
          logo={'/provider.png'}
          controller={controller}
        ></AuthLayout>
      ) : (
        <AuthLayout
          formTitle={t('provider:register_confirm.formTitle')}
          formTopic={t('provider:register_confirm.formTopic')}
          formBtn={t('provider:register_confirm.button')}
          formType="register_success"
          t={t}
          logo={'/provider.png'}
          controller={controller}
        ></AuthLayout>
      )}
    </>
  )
})

export default register_confirm
