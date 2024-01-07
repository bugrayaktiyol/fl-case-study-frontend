import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Link href="/users">
          <Button type="primary">Go to User Management Page</Button>
      </Link>
    </div>
  );
};

export default HomePage;