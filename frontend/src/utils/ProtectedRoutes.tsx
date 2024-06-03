import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { ClipLoader } from 'react-spinners'; // Import the spinner

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { getSession, status, setStatus } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getSession();
        setStatus(true);
      } catch {
        setStatus(false);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [getSession, setStatus]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} /> 
      </div>
    );
  }

  if (!status) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
