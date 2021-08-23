import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../Assets/logo.png";
import fire, { auth } from "../Firebase/Fire";
import { Redirect } from "react-router-dom";
require("firebase/auth");
const useStyles = makeStyles((theme) => ({
  paperSet: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
    width: "30%",
    height: "500px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "400px",
    },
  },
  formSet: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textFieldWidth: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  loginbtn: {
    marginTop: "50px",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  backGround: {
    width: "100%",
    background: "blue",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        background: "#69C9EF",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {flag ? <Redirect push to="/attendance" /> : null}
      <Paper className={classes.paperSet} elevation={3}>
        <form className={classes.formSet} noValidate autoComplete="off">
          {/* <Typography
            style={{ marginBottom: "40px" }}
            variant="h2"
            component="h2"
          >
            DiPixels
          </Typography> */}
          <img style={{ marginBottom: "30px" }} src={logo} alt="Logo" />
          <TextField
            className={classes.textFieldWidth}
            style={{ marginBottom: "20px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.textFieldWidth}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.loginbtn}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
