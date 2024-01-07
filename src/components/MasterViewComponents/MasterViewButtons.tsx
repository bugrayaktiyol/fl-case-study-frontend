import React from "react";
import { ConfigProvider, Space, Button, Popconfirm, message } from "antd";
import type { Key } from "antd/es/table/interface";
import UserFormComponent from "../FormComponents/UserFormComponent";
import { DataType } from "@/models/userModel";
import {
  fetchDataFromApi,
  deleteUserById,
  addNewUser,
} from "@/services/DataService";

interface MasterViewButtonsProps {
  hasSelected: boolean;
  selectedRow: Key[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const MasterViewButtons: React.FC<MasterViewButtonsProps> = ({
  hasSelected,
  selectedRow,
  setData,
}) => {
  const confirmDelete = async (
    e: React.MouseEvent<HTMLElement> | undefined,
    selectedRow: Key[]
  ) => {
    const dataCount = selectedRow.length;

    if (selectedRow && selectedRow.length > 0) {
      try {
        for (const key of selectedRow) {
          await deleteUserById(key.toString());
        }
      } catch (error) {
        message.error("Failed to delete users");
      }
    }
    //setdata to update table
    const updatedData = await fetchDataFromApi();
    setData(updatedData);
    // message success message for deleted users
    message.success(`${dataCount} users deleted successfully`);
  };

  const cancelDelete = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.error("Deletion cancelled");
  };
  // Form submit function
  const handleNewUserSubmit = async (values: any) => {
    try {
      // ID parametresini çıkart
      const { ID, ...userData } = values;
      await addNewUser(userData);
      console.log(values);
      const updatedData = await fetchDataFromApi();
      setData(updatedData);
      message.success("New user added successfully");
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <ConfigProvider>
      <Space size="middle">
        <UserFormComponent
          onFinish={(values) => handleNewUserSubmit(values)}
          formName="New"
        ></UserFormComponent>
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          onConfirm={(e) => confirmDelete(e, selectedRow)}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger disabled={hasSelected}>
            Delete Selected(s)
          </Button>
        </Popconfirm>
      </Space>
    </ConfigProvider>
  );
};

export default MasterViewButtons;
