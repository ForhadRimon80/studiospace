import { Suspense } from 'react';
import LoginPage from './LoginPage';

const page = () => {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default page;