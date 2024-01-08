import React from "react";
import { ConfigProvider, Space, Button, Popconfirm, message } from "antd";
import type { Key } from "antd/es/table/interface";
import UserFormComponent from "../FormComponents/UserFormComponent";
import { DataType } from "@/models/userModel";
import {
  fetchDataFromApi,
  deleteUserById,
  addNewUser,
} from "../../services/DataService";

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
  const handleDeleteConfirm = async (
    e: React.MouseEvent<HTMLElement> | undefined,
    selectedRow: Key[]
  ) => {
    const dataCount = selectedRow.length;

    if (selectedRow && selectedRow.length > 0) {
      try {
        await Promise.all(selectedRow.map((key) => deleteUserById(key.toString()))); // Delete all selected users in parallel
      } catch (error) {
        message.error("Failed to delete users");
      }
    }

    const updatedData = await fetchDataFromApi();
    setData(updatedData);

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
          onConfirm={(e) => handleDeleteConfirm(e, selectedRow)}
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
