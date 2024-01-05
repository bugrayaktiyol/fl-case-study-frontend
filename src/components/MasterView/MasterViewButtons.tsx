import React from 'react';
import { ConfigProvider, Space, Button, Popconfirm, message } from 'antd';
import type { Key } from 'antd/es/table/interface';
import UserFormComponent from '../Form/UserFormComponent';
import { DataType } from '@/models/userModel';
import { deleteUserById } from '@/services/DataService';

interface MasterViewButtonsProps {
  hasSelected: boolean;
  selectedRow: Key[]
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const MasterViewButtons: React.FC<MasterViewButtonsProps> = ({ hasSelected, selectedRow, setData }) => {
  const confirm = async (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (selectedRow && selectedRow.length > 0) {
      
      message.success('Clicked on Yes');

      // Deleting selected row
      await deleteItems(selectedRow);

      // Verileri güncellemek için parent bileşene bildirim gönderiliyor
      setData((prevData) => [...prevData]); 

    } else {
      // if no row has been selected
      message.warning('No user selected');
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.error('Clicked on No');
  };
  
  // Form submit function
  const handleNewUserSubmit = (values: any, setData: React.Dispatch<React.SetStateAction<DataType[]>>) => {
    setData((prevData) => [
      ...prevData,
      {
        key: (Math.max(...prevData.map(item => Number(item.key))) + 1).toString(),
        ...values,
        tags: values.tags.split(','),
      },
    ]);
    message.success('New user added successfully');
  };
  
  const deleteItems = async (keys: Key[]) => {
    // Deleting selected keys
    for (const key of keys) {
      await deleteUserById(key.toString());
    }
  };

  return (
    <ConfigProvider>
      <Space size="middle">
        <UserFormComponent onFinish={(values) => handleNewUserSubmit(values, setData)} formName="New"></UserFormComponent>

        <Button type="primary" disabled={hasSelected}>
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={(e) => confirm(e)}
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

export default MasterViewButtons;
