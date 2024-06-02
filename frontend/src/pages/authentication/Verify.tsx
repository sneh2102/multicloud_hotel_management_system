import React, { useState, useEffect, useContext } from 'react';
import { Col, Button, Row, Container, Card, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../utils/UserPool';
import { AuthContext } from '../../context/Auth';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const location = useLocation();
  const email = location.state?.email || '';
  const password = location.state?.password || '';
  const name = location.state?.name || '';
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    if (!email || !password) {
      setMessage("No user found. Please sign up or log in.");
    }
  }, [email, password]);

  const resendConfirmationLink = () => {
    setMessage("Sending confirmation link...");
    const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
        setMessage("Failed to resend confirmation link. Please try again.");
      } else {
        console.log(result);
        setMessage("Confirmation link has been resent to your email.");
      }
    });
  };

  const handleContinue = async () => {
    try {
      await authenticate(email, password);
      setMessage("Email Verified. You are now logged in.");
      navigate('/sec-ques', { state: { email, password, name } });
    } catch (error) {
      console.error(error);
      setMessage("Email Not Verified. Please verify your email.");
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="fw-bold mb-2 text-uppercase">Verify Your Email</h2>
              <p>Please check your email for a verification link. Click the link to verify your email address.</p>
              {message && <Alert variant={message.includes("Failed") ? "danger" : "success"}>{message}</Alert>}
              <Button variant="primary" onClick={resendConfirmationLink}>Resend Confirmation Link</Button>
              <Button 
                variant="secondary" 
                className="mt-3" 
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmail;
