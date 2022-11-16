import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import TextFieldComponent from "./Common/TextFieldComponent";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/login", this.state)
      .then((res) => {
        sessionStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("username", res.data.username);
        axios.defaults.headers.common["Authorization"] =
          "Bearer" + res.data.username;
        //TODO Get the username from the response
        alert("Logged in");
        //TODO compare and continue to access control
        alert(this.state.username + " logged in successfully");
        const decoded = jwtDecode(res.data.token);
        sessionStorage.setItem("role", decoded.role);
        console.log(decoded.role);
        //check the role and redirect to the view
        if (decoded.role === "Admin") {
          window.location.href = "/admin";
        } else if (decoded.role === "Manager") {
          window.location.href = "/manager";
        } else if (decoded.role === "Worker") {
          window.location.href = "/worker";
        } else {
          window.location.href = "#";
        }
      })
      .catch((error) => {
        alert("Login failed, please try again");
      });
  };

  render() {
    const { username, password } = this.state;
    console.log(username, password);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <Typography variant="h5" sx={{ color: "black" }}>
            Login with your employee account
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl sx={{ width: "40ch" }} variant="outlined">
              <TextFieldComponent
                classes="form-field"
                name="username"
                value={username}
                id="username"
                label="Username"
                variant="outlined"
                onChange={this.handleChange}
                required
              />{" "}
              <br />
              <TextFieldComponent
                type="password"
                name="password"
                classes="form-field"
                value={password}
                id="password"
                label="Password"
                variant="outlined"
                onChange={this.handleChange}
                required
              />{" "}
              <br />
              <Button type="submit" variant="contained">
                Login
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
