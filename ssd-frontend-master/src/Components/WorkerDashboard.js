import React, { Component } from "react";
import axios from "axios";
import { FormControl, Button, TextField, Grid } from "@mui/material";
import CryptoJS from "crypto-js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TextFieldComponent from "./Common/TextFieldComponent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class WorkerDashboard extends Component {
  constructor(props) {
    const user = localStorage.getItem("username");
    super(props);

    this.state = {
      message: "",
      encryptedMsg: "",
      sender: user,
      allMessage: [],
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwtToken");
    const user = localStorage.getItem("username");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    axios
      .get(`http://localhost:4000/messages/messagess/${user}`, this.state, {})
      .then((response) => {
        this.setState({
          allMessage: response.data,
        });

        // window.location.reload(false);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwtToken");
    var sendingTxt = CryptoJS.enc.Utf8.parse(this.state.message);
    var key = CryptoJS.enc.Utf8.parse("JaNdRgUkXp2s5v8y");
    var encrypted = CryptoJS.AES.encrypt(sendingTxt, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.ZeroPadding,
    });
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    this.state.encryptedMsg = encrypted;
    console.log("Encrypted message : ", this.state.encryptedMsg);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    axios
      .post("http://localhost:4000/messages/messages", this.state, {})
      .then((response) => {
        console.log(response);
        alert("Message sent successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        if (error.response.data.code === 401) {
          alert(
            "Message authentication failed, someones changing your data on the way to the server"
          );
        }
        if (error.response.data.code === 404) {
          alert("Message sending failed");
        }
      });
  };

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }

  render() {
    var role = sessionStorage.getItem("role");
    if (role === "Worker") {
      const { message } = this.state;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid container>
            <Grid md={4}>
              <div>
                <br />
                <h2>Worker Dashboard</h2>
                <h3>Enter Message</h3>
                <form id="msgForm" onSubmit={this.handleSubmit}>
                  <FormControl sx={{ width: "40ch" }} variant="outlined">
                    <TextField
                      name="message"
                      id="message"
                      label="Message"
                      variant="outlined"
                      value={message}
                      onChange={this.handleChange}
                      required
                    />{" "}
                    <br />
                    <Button type="submit" variant="contained">
                      Send
                    </Button>
                  </FormControl>
                </form>
                <br />
                <br />
                <br />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => this.logout()}
                >
                  Logout
                </Button>
              </div>
            </Grid>
            <Grid md={6} mt={15}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ width: "50%" }}>
                        Messages
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.allMessage.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please login to continue</h1>
          <Button
            variant="outlined"
            color="error"
            onClick={() => this.logout()}
          >
            Go to login
          </Button>
        </div>
      );
    }
  }
}

export default WorkerDashboard;
