import axios from "axios";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Import your CSS file for additional styling

function Signup() {
  const [role, setRole] = useState("customer");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const doSignUp = () => {
    if (!role) {
      setMsg("Please select a role.");
      return;
    }

    if (role === "customer") {
      navigate("/auth/customsinup");
    } else if (role === "airline") {
      navigate("/auth/airlinesignup");
    } else if (role === "executive") {
      navigate("/auth/executivesignup");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} className="signup-form">
          <Form>
            <h3 className="mb-4 text-center">Select Role</h3>
            {msg !== "" && <Alert variant="danger">{msg}</Alert>}

            <Form.Group controlId="formRole">
              <Form.Label>Select Role:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="customer">Customer</option>
                <option value="airline">Airline</option>
                <option value="executive">Executive</option>
              </Form.Control>
            </Form.Group>

            <Button variant="danger" block onClick={() => doSignUp()}>
              Sign Up
            </Button>
          </Form>

          <div className="mt-4 text-center">
            <p>
              Have an Account?{" "}
              <Button
                variant="link"
                className="signup-login-link"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
