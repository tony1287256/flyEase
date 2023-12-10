import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ExecutiveSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const doSignUp = () => {
    // Simple form validation
    if (!name || !email || !username || !password) {
      setMsg('Please fill in all the required fields.');
      return;
    }

    // Email validation using a simple regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    let ExObj = {
      "name": name,
      "email": email,
      "user": {
        "username": username,
        "password": password
      }
    };
    axios
      .post('http://localhost:8081/executive/add', ExObj)
      .then(response => {
        setMsg('Signup success'); // Set your desired state here
        navigate('/auth/login?msg="signup success"');
        // Redirect to login page or handle success as needed
      })
      .catch(function (error) {
        console.log("error", error.response.data)
        if (error.response.data === "Email already exists.") {
          setMsg("Email already exists. Please try with a different email");
        } else {
          setMsg("Issue in processing sign up..");
        }
      });
  };

  return (
    <div>
      <Container className="mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Executive Sign Up</h3>
              </div>
              <div className="card-body">
                {msg !== '' ? (
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                ) : (
                  ''
                )}
                <div className="row " style={{ textAlign: 'right' }}>
                  <div className="col-md-6">
                    <label>Enter Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter Email:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <hr />

                  <div className="col-md-6">
                    <label>Enter Email/Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="email" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                </div>

                <div className="row" style={{ textAlign: 'right' }}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: 'right' }}>
                <button className="btn btn-danger" onClick={() => doSignUp()}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Container>
      <div style={{ textAlign: 'center' }} className="mt-4">
        <span>
          Have an Account?
          <button className="btn btn-link" onClick={() => navigate('/auth/login')}>
            Login
          </button>
        </span>
      </div>
    </div>
  );
}

export default ExecutiveSignup;
