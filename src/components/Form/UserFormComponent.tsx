'use client';
import React from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { DataType } from '@/app/user/page';


const waitTime = (time: number) => new Promise((res) => setTimeout(res, time));

interface UserFormComponentProps {
  onFinish: (values: any) => void;
  formName: string;
  showPlusIcon?: boolean;
  initialValue?: DataType;
}

const UserFormComponent: React.FC<UserFormComponentProps> = ({onFinish, formName,showPlusIcon = true, initialValue = [] }) => {
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title="Add new user"
      trigger={
        <Button type="primary">
          {showPlusIcon && <PlusOutlined />} {/* Conditionally rendering PlusOutlined icon for purpose*/}
          {formName}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      initialValues={initialValue}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000); // Fake loading
        onFinish(values);
        message.success('Submitted successfully');
        return true;
      }}
      submitter={{
        searchConfig: {
          resetText: 'Cancel',
          submitText: 'Submit',
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Name"
          placeholder="Enter name"
        />

        <ProFormText
          width="md"
          name="age"
          label="Age"
          placeholder="Enter age"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="address"
          label="Address"
          placeholder="Enter Address"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="tags"
          label="Tags"
          placeholder="Enter tags"
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default UserFormComponent;
