import React from "react";
import { Space, Tag, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserFormComponent from "@/components/FormComponents/UserFormComponent";
import { DataType } from "@/models/userModel";
import {
  fetchDataFromApi,
  updateUser,
  deleteUserById,
} from "@/services/DataService";
import Link from "next/link";

interface ColumnsProps {
  updateData: (newData: DataType[]) => void;
}

const columns = ({ updateData }: ColumnsProps): ColumnsType<DataType> => [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
    sorter: (a, b) => Number(a.key) - Number(b.key),
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: (text, record) => (
      <Link href={`/users/${record.key}`} passHref>
        {text}
      </Link>
    ),
  },
  {
    title: "Age",
    dataIndex: "Age",
    key: "Age",
    sorter: (a, b) => a.Age - b.Age,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
  {
    title: "Tags",
    key: "Tags",
    dataIndex: "Tags",
    render: (_, { Tags }) => (
      <>
        {Tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag.toLowerCase() === "loser") {
            color = "volcano";
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <UserFormComponent
          onFinish={(values) => handleEditSubmit(values, updateData)}
          formName="Edit"
          showPlusIcon={false}
          initialValue={record}
        ></UserFormComponent>
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          onConfirm={(e) => confirm(e, record.key, updateData)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const handleEditSubmit = async (
  values: DataType,
  updateData: (newData: DataType[]) => void
) => {
  try {
    await updateUser(Number(values.key), values);
    const updatedData = await fetchDataFromApi();

    updateData(updatedData);
  } catch (error) {
    console.error("Error editing user:", error);
  }
};

const confirm = async (
  e: React.MouseEvent<HTMLElement> | undefined,
  id: string,
  updateData: (newData: DataType[]) => void
) => {
  try {
    await deleteUserById(id);
    message.success("User deleted successfully");
    const updatedData = await fetchDataFromApi();
    updateData(updatedData);
  } catch (error) {
    console.error("Error deleting user:", error);
    message.error("Failed to delete user");
  }
};

const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
  console.log(e);
  message.error("Canceled deleting user");
};

export default columns;
