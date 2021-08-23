import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { db } from "../Firebase/Fire";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  //   setDiv: {
  //     display: "flex",
  //     justifyContent: "space-evenly",
  //     alignItems: "center",
  //   },
  paperWidth: {
    width: "87%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  paperSet: {
    marginTop: "25px",
    borderRadius: "10px",
    width: "46%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  headingSet: {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  formDiv: {
    width: "100%",
    display: "flex",

    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  textFieldName: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  textFieldSsid: {
    width: "100%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btn: {
    width: "20%",
    marginTop: "20px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formDepartment: {
    width: "100%",
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  },
}));
const CreateUser = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mac, setMac] = useState("");
  const [pin, setPin] = useState("");
  const [department, setDepartment] = useState("");
  const [dropdowndepartment, setDropDownDepartment] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formsubmit = (e) => {
    try {
      var ssidRef = db.collection("auth");
      ssidRef.doc(pin).set({
        name: name,
        email: email,
        mac: mac,
        pin: pin,
        department: department,
      });
      setName("");
      setEmail("");
      setMac("");
      setPin("");
      setDepartment("");

      enqueueSnackbar("Form Add Succesffuly", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  useEffect(() => {
    const attendaceData = [];
    db.collection("department")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((attendace) => {
          attendaceData.push(attendace.data().department);
        });
        setDropDownDepartment(attendaceData);
      });
  }, []);
  return (
    <div className={classes.paperWidth}>
      <Paper className={classes.paperSet} elevation={3}>
        <Typography className={classes.headingSet} variant="h5" component="h2">
          Add New User
        </Typography>
        <div className={classes.formDiv}>
          <form className={classes.form} noValidate autoComplete="off">
            <div style={{ display: "flex" }}>
              <TextField
                className={classes.textFieldName}
                id="abc"
                label="Name"
                name="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl
                variant="outlined"
                className={classes.formDepartment}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Deaprtment
                </InputLabel>
                <Select
                  onChange={(e) => setDepartment(e.target.value)}
                  id="abc"
                  native
                  label="Deaprtment"
                >
                  <option aria-label="None" value={department} />
                  {dropdowndepartment.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              className={classes.textFieldSsid}
              id="abc"
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classes.textFieldSsid}
              id="abc"
              label="Mac"
              name="mac"
              variant="outlined"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
            />
            <TextField
              className={classes.textFieldSsid}
              id="abc"
              label="Pin"
              name="pin"
              variant="outlined"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <Button
              onClick={formsubmit}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default CreateUser;
