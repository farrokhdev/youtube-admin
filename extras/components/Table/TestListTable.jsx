import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function TableExample({ columns, data }) {
  console.log(data)
  return (
    <Table>
      <Thead>
        <Tr className="table_head">
          {columns.map((item, indx) => {
            return <Th key={indx}>{item.title}</Th>
          })}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, indx) => {
          return (
            <>
              <Tr className="table_body">
                <Td>{item.id}</Td>
                <Td>{item.title}</Td>
                <Td>{item.is_activated ? 'فعال' : 'غیر فعال'}</Td>
                <Td>{item.created_at}</Td>
                <Td>
                  <div className="actions">
                    <Button
                      className="delete"
                      onClick={() => deleteHandler(data.id, i)}
                    >
                      <DeleteOutlined />
                    </Button>

                    <Button
                      className="edit"
                      onClick={() => updateHandler(data.id)}
                    >
                      <EditOutlined />
                    </Button>
                  </div>
                </Td>
              </Tr>
            </>
          )
        })}
      </Tbody>
    </Table>
  )
}
