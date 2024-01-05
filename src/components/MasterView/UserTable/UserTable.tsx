// UserTable.tsx
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { Key } from 'antd/es/table/interface';
import { fetchDataFromApi } from '@/services/DataService';
import MasterViewButtons from '@/components/MasterView/MasterViewButtons';
import columns from './TableColumns';
import { DataType } from '@/models/userModel';

const UserTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetchDataFromApi();
      setData(apiData);
      console.log(apiData);
    };

    fetchData();
  }, [selectedRowKeys]);

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

export default UserTable;
