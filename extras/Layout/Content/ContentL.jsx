import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import { useRouter } from 'next/router'

const { Content } = Layout

export const ContentL = ({ child }) => {
  const router = useRouter()

  let path = router.pathname

  // path.toLowerCase()
  // // path.replace('/', '')
  // path = [...new Set(path)]
  // console.log(path)
  return (
    <>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{path}</Breadcrumb.Item>
      
      </Breadcrumb> */}
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {child}
      </Content>
    </>
  )
}
