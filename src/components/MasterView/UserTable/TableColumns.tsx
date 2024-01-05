
import React from 'react';
import { Space, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import UserFormComponent from '@/components/Form/UserFormComponent';
import { ApiResponse, DataType } from '@/models/userModel';

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <UserFormComponent onFinish={handleEditSubmit} formName='Edit' showPlusIcon={false} initialValue={record}></UserFormComponent>
        <Button onClick={() => handleDelete(record.key)}>Delete</Button>
      </Space>
    ),
  }
];

const handleEditSubmit = (values: any) => {
}

const handleDelete = (key: string) => {
};


export default columns;