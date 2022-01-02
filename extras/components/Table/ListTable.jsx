import React, { useState } from 'react'
import { Table, Radio, Divider, Button, Popconfirm, Card, Switch } from 'antd'
// import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import StateView from 'extras/components/StateView/StateView'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'
import { MainController } from 'extras/controllers/MainController'
import { observer } from 'mobx-react'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    )
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
}

export const ListTable = observer(
  ({ list, columns, size, loading, footer, onRow, rowClassName }) => {
    const [visible, setVisible] = React.useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false)

    const { t } = useTranslation()

    // popconfirm
    const showPopconfirm = () => {
      setVisible(true)
    }

    const handleOk = () => {
      setConfirmLoading(true)
      setTimeout(() => {
        setVisible(false)
        setConfirmLoading(false)
      }, 2000)
    }

    const handleCancel = () => {
      // console.log('Clicked cancel button')
      setVisible(false)
    }

    const tableTitles = Object.keys(list)

    const [selectionType, setSelectionType] = useState('checkbox')
    return (
      <div className="table">
        <Table
          locale={{
            emptyText: t('provider:tableList.nodata'),
          }}
          className="table"
          size={size ? size : 'middle'}
          // loading={loading}
          rowClassName={rowClassName && rowClassName}
          pagination={true}
          rowKey="id"
          onRow={onRow && onRow}
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={list}
          footer={footer && footer}
        />
      </div>
    )
  },
)
