import React, { useEffect, useState, useContext } from 'react';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import {  useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/authApis';

interface UserProfileInterface {
  email: string;
  name: string;
// Add other fields as necessary
}

const UserProfile: React.FC = () => {
  const { logout, getSession } = useAuth();
  const [user, setUser] = useState<UserProfileInterface | null>({ email: '', name: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log();
    const fetchUserDetails = async () => {
      try {
        const session = await getSession();
        const email = session.getIdToken().payload.email;

        const data = await getUser(email);
        console.log(data.data);
        setUser(data.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to load user information.');
      }
    };

    fetchUserDetails();
  }, [getSession]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="fw-bold mb-2 text-uppercase">User Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {user ? (
                <div>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Username:</strong> {user.name}</p>
                  {/* Add other user details here */}
                  <Button variant="primary" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
