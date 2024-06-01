import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const AppNavbar: React.FC = () => {
  const { logout, status, getSession, setStatus } = useAuth();
  const [role, setRole] = React.useState<string>("");
  useEffect(() => {
    const temp = localStorage.getItem("role");
    setRole(temp || "user");
    getSession()
      .then((session) => {
        setStatus(true);
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        setStatus(false);
      });
  }, [getSession]);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>Dal Vacation</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            {status && (
              <>
                <Nav.Link href='/userprofile'>Profile</Nav.Link>
                <Nav.Link href='/customer-queries'>Customer Queries</Nav.Link>
                <Nav.Link href='/booking-history'>Booking History</Nav.Link>
                <Nav.Link href='/analysis'>Analytics</Nav.Link>
                {role === "admin" && (
                  <Nav.Link href='/agent-queries'>Agent Queries</Nav.Link>
                )}
                {role === "admin" && (
                  <Nav.Link href='/room-managment'>Room Managment</Nav.Link>
                )}
                  <Button variant='outline-danger' onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {!status && (
              <>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/signup'>Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
