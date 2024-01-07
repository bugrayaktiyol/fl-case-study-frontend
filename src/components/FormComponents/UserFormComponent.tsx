"use client";
import React from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDigit,
} from "@ant-design/pro-form";
import { DataType } from "@/models/userModel";

const waitTime = (time: number) => new Promise((res) => setTimeout(res, time));

interface UserFormComponentProps {
  onFinish: (values: any) => void;
  formName: string;
  showPlusIcon?: boolean;
  initialValue?: DataType;
}

const UserFormComponent: React.FC<UserFormComponentProps> = ({
  onFinish,
  formName,
  showPlusIcon = true,
  initialValue = [],
}) => {
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title="Add new user"
      trigger={
        <Button type="primary">
          {showPlusIcon && <PlusOutlined />}{" "}
          {/* Conditionally rendering PlusOutlined icon for edit/create */}
          {formName}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      initialValues={initialValue}
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={1000}
      onFinish={async (values: any) => {
        await waitTime(1000); // Fake loading
        onFinish(values);
        return true;
      }}
      submitter={{
        searchConfig: {
          resetText: "Cancel",
          submitText: "Submit",
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          disabled
          width="md"
          name="key"
          label="ID"
          placeholder="UUID"
        />
        <ProFormText
          width="md"
          name="Name"
          label="Name"
          placeholder="Enter name"
        />

        <ProFormDigit
          label="Age"
          name="Age"
          min={1}
          max={120}
          fieldProps={{ precision: 0 }}
          placeholder="Enter age"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Address"
          label="Address"
          placeholder="Enter Address"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="Tags"
          label="Tags"
          placeholder="Enter tags"
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default UserFormComponent;
