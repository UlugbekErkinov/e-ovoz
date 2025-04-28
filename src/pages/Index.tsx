
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to our new HomePage
  return <Navigate to="/" replace />;
};

export default Index;
