import axios from "axios";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function CustomerSignup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [customer, setCustomer] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const doSignUp = () => {
    // Simple form validation
    if (!name || !age || !gender || !email || !phone || !username || !password) {
      setMsg('Please fill in all the required fields.');
      return;
    }
    if (phone.length !== 10 ) {
      setMsg("Please enter a valid phone number");
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

    let customerObj = {
      name: name,
      age: age,
      gender: gender,
      email: email,
      phone: phone,
      user: {
        username: username,
        password: password,
      },
    };

    axios
      .post('http://localhost:8081/customer/signup', customerObj)
      .then((response) => {
        setCustomer(response.data);
        navigate('/auth/login?msg="signup success"');
      })
      //changing
      .catch(function (error) {
        console.log("error",error.response.data)
        if(error.response.data === "Email already exists."){
          setMsg("Email already exists.please try with different Email");
        }
        else{
        setMsg("Issue in processing sign up..");
        }
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                {msg !== '' ? (
                  <div class="alert alert-danger" role="alert">
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
                    <label>Enter Age:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="number" className="form-control" onChange={(e) => setAge(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter gender:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setGender(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter Email:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="col-md-6">
                    <label>Enter phone number:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} required />
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
            <div style={{ textAlign: 'left' }} className="mt-4">
              <span>
                Have an Account?
                <button className="btn btn-link" onClick={() => navigate('/auth/login')}>
                  Login
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSignup;