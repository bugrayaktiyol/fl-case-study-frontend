'use client';
import React, {useState} from 'react';
import {ConfigProvider, Space, Table, Tag, Button , message, Popconfirm} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'antd/es/table/interface';
import MyFormComponent from '@/components/ModalForm';

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const confirm = (e: React.MouseEvent<HTMLElement> | undefined, selectedRowKeys: Key[], setData: React.Dispatch<React.SetStateAction<DataType[]>>) => {
  console.log(e);
  message.success('Clicked on Yes');
  deleteItem(e, selectedRowKeys, setData);
};

const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
  console.log(e);
  message.error('Clicked on No');
};

const deleteItem = (e: React.MouseEvent<HTMLElement> | undefined, selectedRowKeys: Key[], setData: React.Dispatch<React.SetStateAction<DataType[]>>) => {
  
  const newData = [...initialData];

  selectedRowKeys.forEach(key => {
    const index = newData.findIndex(item => item.key === key);
    if (index !== -1) {
      newData.splice(index, 1);
    }
  });

  setData(newData);
  console.log(selectedRowKeys);
};


// Form submit function
const handleFormFinish = async (values: any) => {
  console.log('Form Values:', values);
};

const MasterViewButtons: React.FC<{ hasSelected: boolean, selectedRow: Key[], setData: React.Dispatch<React.SetStateAction<DataType[]>> }> = ({ hasSelected, selectedRow, setData }) => {

  return (
    <ConfigProvider>
    <Space size="middle">
      <MyFormComponent onFinish={handleFormFinish} formName="New"></MyFormComponent>
      
      <Button type="primary" disabled={hasSelected}>
        Edit
      </Button>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={(e) => confirm(e, selectedRow, setData)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger disabled={hasSelected}>
          Delete
        </Button>
      </Popconfirm>
    </Space>
    </ConfigProvider>
  );
};

const columns: ColumnsType<DataType> = [
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
        <MyFormComponent onFinish={handleFormFinish} formName='Edit' showPlusIcon={false} initialValue={record}></MyFormComponent>
        <Button onClick={() => handleDelete(record.key)}>Delete</Button>
      </Space>
    ),
  }
];

const handleEdit = (key: string) => {
  console.log('Edit user with key:', key);
};

const handleDelete = (key: string) => {
  console.log('Delete user with key:', key);
};

const initialData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (selectedKeys: Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <MasterViewButtons hasSelected={!hasSelected} selectedRow={selectedRowKeys} setData={setData} />
      <Table columns={columns} dataSource={data} rowSelection={{ onChange: onSelectChange }} />
    </>
  );
};

export default App;