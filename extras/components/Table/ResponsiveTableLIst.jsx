import React, { useState } from "react";
import { Table, Radio, Divider, Button, Popconfirm, Card, Switch } from "antd";
// import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import StateView from "extras/components/StateView/StateView";

import Image from "next/image";
import { MainController } from "extras/controllers/MainController";
import { observer } from "mobx-react";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

export const ResponsiveTableList = observer(
  ({
    list,
    deleteHandler,
    confirm,
    cancel,
    updateHandler,
    mobileColumn,
    title,
    footer,
  }) => {
    const tableTitles = Object.keys(list);

    const [selectionType, setSelectionType] = useState("checkbox");
    return (
      <>
        <div className="_table_title">{title}</div>

        <>
          {list.map((box, key) => {
            return (
              <Card key={key} className="mobile_table">
                <div className="box">
                  {mobileColumn(box).map((item) => {
                    return (
                      <>
                        <>{item.item1 && item.item1}</>
                        <>{item.item2 && item.item2}</>
                        <>{item.item3 && item.item3}</>
                        <>{item.item4 && item.item4}</>
                        <>{item.item5 && item.item5}</>
                        <>{item.item6 && item.item6}</>
                      </>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </>
        {footer && <div className="table_footer">{footer}</div>}
      </>
    );
  }
);
