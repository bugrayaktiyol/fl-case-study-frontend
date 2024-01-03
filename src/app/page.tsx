import { Button } from 'antd';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Link href="/user">
          <Button type="primary">Go to User Page</Button>
      </Link>
    </div>
  );
};

export default HomePage;