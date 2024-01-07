// UserTable.tsx
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { Key } from "antd/es/table/interface";
import { fetchDataFromApi } from "@/services/DataService";
import MasterViewButtons from "@/components/MasterViewComponents/MasterViewButtons";
import columns from "./TableColumns";
import { DataType } from "@/models/userModel";

const UserTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiData = await fetchDataFromApi();
        setData(apiData);
        console.log(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSelectChange = (selectedKeys: Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const updateData = (newData: DataType[]) => {
    setData(newData);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <MasterViewButtons
        hasSelected={!hasSelected}
        selectedRow={selectedRowKeys}
        setData={setData}
      />
      <Table
        columns={columns({ updateData })}
        dataSource={data}
        rowSelection={{ onChange: onSelectChange }}
        loading={loading}
        locale={{ emptyText: "Loading data..."}}
      />
    </>
  );
};

export default UserTable;
