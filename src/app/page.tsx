"use client";
import React, { useState } from "react";
import { Button, Spin, Typography } from "antd";
import Link from "next/link";

const { Text } = Typography;

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div onClick={() => setLoading(true)}>
        <Link href="/users" passHref>
          <Button type="primary">Go to User Management Page</Button>
        </Link>
      </div>
      {loading && (
        <div style={{ marginTop: "8px" }}>
          <Spin size="large" />
          <Text style={{ margin: "8px 0", color: "#1890ff" }}>
            Loading User Management System...
          </Text>
        </div>
      )}
    </div>
  );
};

export default HomePage;
