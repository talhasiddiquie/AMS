import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../Assets/logo.png";
import { db } from "../Firebase/Fire";
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
    marginTop: "5px",
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

const Checkin = () => {
  const classes = useStyles();
  const [pin, setPin] = useState("");
  const [flag, setFlag] = useState(false);
  const [latlong, setLatLong] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat + "," + long + "------------------------------->");
    if (!(lat >= 24 && lat <= 25 && long >= 67 && long <= 68)) {
      setFlag(true);
    }
  }

  const handleLogin = async () => {
    var currentdate = new Date();
    try {
      const pinRef = db.collection("auth").doc(pin);
      const doc = await pinRef.get();

      const setAttendance = {
        ...doc.data(),
        checkin: currentdate.getTime(),
      };

      var attendanceKey =
        currentdate.getDate() +
        " " +
        (currentdate.getMonth() + 1) +
        " " +
        currentdate.getFullYear() +
        " " +
        doc.data().email;

      const userDocument = await db
        .collection("attendance")
        .doc(attendanceKey)
        .get();

      if (userDocument.data() === undefined) {
        const setData = db
          .collection("attendance")
          .doc(attendanceKey)
          .set(setAttendance)
          .then((e) => alert("You have CheckedIn Successfully"));
      } else {
        alert("Your attendance has already marked for today.");
      }

      if (doc.data() === undefined) {
        throw "No data has found";
      }
    } catch (err) {
      console.log(err);
    }
    setPin("");
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div
      style={{
        background: "#69C9EF",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {flag ? <Redirect push to="/noauthorize" /> : null}
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

          <Typography>
            <h5>Employee Pin Number</h5>
          </Typography>

          <TextField
            className={classes.textFieldWidth}
            style={{ marginBottom: "20px" }}
            id="outlined-basic"
            label="Pin"
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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

export default Checkin;
