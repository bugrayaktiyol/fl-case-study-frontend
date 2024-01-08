// Import necessary dependencies and components
'use client';
import React from 'react';
import { fetchSingleUser } from '@/services/DataService';
import { DataType } from '@/models/userModel';
import { Card, Typography, Button } from 'antd';
import Link from 'next/link';


const { Title, Paragraph } = Typography;

export default async function userDetails({params} : {params: any}) {
  // Fetch data from API
  const user: DataType = await fetchSingleUser(params.userId);
  const { Name, Age, Address, Tags } = user;
  return (
    <Card title={<Title level={2}>User Details Page</Title>} style={{ width: 400 }}>
      <Paragraph><strong>Name:</strong> {Name}</Paragraph>
      <Paragraph><strong>Age:</strong> {Age}</Paragraph>
      <Paragraph><strong>Address:</strong> {Address}</Paragraph>
      <Paragraph><strong>Tags:</strong> {Tags.join(', ')}</Paragraph>
      
      <Link href="/users">
          <Button type="default">Go Back</Button>
      </Link>
    </Card>
  );
};