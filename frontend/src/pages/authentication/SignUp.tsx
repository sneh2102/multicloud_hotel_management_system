import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserPool from '../../utils/UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export const SignUp = () => {
  const navigate = useNavigate();

  interface User {
    email: string;
    password: string;
    name: string;
  }

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors: { email?: string; password?: string; name?: string } = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    const passwordPattern = /^[\S]+.*[\S]+$/;
    if (user.password.length < 6 || !passwordPattern.test(user.password)) {
      newErrors.password = "Password must be at least 6 characters long and cannot contain spaces";
      isValid = false;
    }

    if (user.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      
      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
          Name: 'name',
          Value: user.name,
        }),
      ];
      // Sign up the user
      UserPool.signUp(user.email, user.password, attributeList , [], (err, data) => {
        if (err) {
          console.error(err);
        } else {
          navigate('/verify', { state: { email: user.email, password: user.password, name: user.name } });
        }
      });
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
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Sign up
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Already have an account?{" "}
                    <Link to='/login'>
                      Login
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
}

export default SignUp;
