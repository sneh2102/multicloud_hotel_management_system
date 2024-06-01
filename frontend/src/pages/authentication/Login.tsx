import React, { useContext } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import {Auth, AuthContext} from '../../context/Auth';
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const  { authenticate, logout } = useContext(AuthContext)
  interface User {
    email: string;
    password: string;
  }

  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const data = await authenticate(user.email, user.password);
      await logout();
      navigate('/login-verify',{state:{
        email: user.email,
        password: user.password
      }});
    }
    catch(err){
      toast.error('Invalid email or password');
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">Dal Vacations</h2>
                <Form className="mb-3" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-start">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="mb-3">
                    <p className="small">
                      <Link to='/forgotpass' className="text-primary" >
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Don't have an account?{" "}
                    <Link to='/signup'>
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
