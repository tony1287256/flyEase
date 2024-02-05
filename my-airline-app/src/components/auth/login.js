import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const { login } = useAuth();
  const [param] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(param.get("msg"));
  const navigate = useNavigate();

  const doLogin = () => {
    let token = window.btoa(username + ":" + password);

    axios
      .post(
        "http://localhost:8081/user/login",
        {},
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("isLoggedIn", true);

        let role = response.data.role;

        switch (role) {
          case "CUSTOMER":
            navigate("/customer/components/promo");
            break;
          case "AIRLINE":
            navigate("/airline/components/Adashboard", { state: { userId: response.data.id } });
            break;
          case "EXECUTIVE":
            navigate("/executive/edashboard");
            break;
          default:
        }

        // Call login function from AuthContext
        login(response.data);
      })
      .catch(function (error) {
        setMsg("Invalid Credentials");
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>
                <i className="bi bi-door-open"></i> Login
              </h3>
            </div>
            <div className="card-body">
              {msg !== null ? (
                <div className="alert alert-danger" role="alert">
                  {msg}
                </div>
              ) : (
                ""
              )}
              <div className="row " style={{ textAlign: "right" }}>
                <div className="col-md-6">
                  <label>
                    <i className="bi bi-person"></i> Enter Email/Username:
                  </label>
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ textAlign: "right" }}>
                <div className="col-md-6">
                  <label>
                    <i className="bi bi-lock"></i> Enter Password:
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "right" }}>
              <button className="btn btn-danger" onClick={() => doLogin()}>
                <i className="bi bi-box-arrow-in-right"></i> Login
              </button>
            </div>
          </div>
          <div style={{ textAlign: "left" }} className="mt-4">
            <span>
              Don't have an Account ?
              &nbsp;&nbsp;{" "}
              <button
                className="btn btn-danger"
                onClick={() => navigate("/auth/customsinup")}
              >
                <i className="bi bi-person-plus"></i> Sign Up
              </button>
            </span>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default Login;
