import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import ENavbarComponent from "./enavbar";

function AirlineSignup() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const checkUniqueEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:9191/customer/check-unique-email?email=${username}`);
      return response.data.isUnique;
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false;
    }
  };

  const doSignUp = () => {
    // Simple form validation
    if (!name || !code || !username || !password) {
      setMsg('Please fill in all the required fields.');
      return;
    }

    // Email validation using a simple regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setMsg("Please enter a valid email address");
      return;
    }

    // Password validation
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMsg("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
      return;
    }

    let airlineObj = {
      name: name,
      code: code,
      user: {
        username: username,
        password: password,
      },
    };

    axios
      .post('http://localhost:8081/airline/add', airlineObj)
      .then((response) => {
        setMsg('Airline added successfully.');
        // Reset form fields
        setName('');
        setCode('');
        setUsername('');
        setPassword('');
      })
      .catch(function (error) {
        console.log("error", error.response.data);
        if (error.response.data === "Email already exists.") {
          setMsg("Email already exists. Please try with a different Email");
        } else {
          setMsg("Issue in processing sign up..");
        }
      });
  };

  return (
    <div>
      <ENavbarComponent />
      <Container className="mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Add Airline</h3>
              </div>
              <div className="card-body">
                {msg !== '' ? (
                  <div className="alert alert-success" role="alert">
                    {msg}
                  </div>
                ) : (
                  ''
                )}
                <div className="row " style={{ textAlign: 'right' }}>
                  <div className="col-md-6">
                    <label>Enter Airline Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter Airline Code:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required />
                  </div>

                  <hr />

                  <div className="col-md-6">
                    <label>Enter Admin Email/Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="email" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter Admin Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: 'right' }}>
                <button className="btn btn-danger" onClick={() => doSignUp()}>
                  Add
                </button>
              </div>
            </div>
            <div style={{ textAlign: 'left' }} className="mt-4">
              {/* ... (your JSX) */}
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Container>
    </div>
  );
}

export default AirlineSignup;
