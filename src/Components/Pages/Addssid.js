import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "../Firebase/Fire";
import { useSnackbar } from "notistack";
import CreateUser from "./CreateUser";
import "../Pages/style.css";
const useStyles = makeStyles((theme) => ({
  setDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  paperSet: {
    borderRadius: "10px",
    width: "40%",
    height: "80%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "20px",
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
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  textFieldName: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  textFieldSsid: {
    width: "100%",
    heigh: 20,
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  btn: {
    width: "20%",
    marginTop: "20px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
}));
const Addssid = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [ssid, setSsid] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formsubmit = () => {
    try {
      var ssidRef = db.collection("ssid");
      ssidRef.doc(name).set({
        name: name,
        ssid: ssid,
      });
      setName("");
      setSsid("");
      enqueueSnackbar("Form Add Succesffuly", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  const departmentformsubmit = () => {
    try {
      var ssidRef = db.collection("department");
      ssidRef.doc().set({
        company: company,
        department: department,
      });
      setCompany("");
      setDepartment("");
      enqueueSnackbar("Department Add Succesffuly", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <div className={classes.setDiv}>
      <Paper className={classes.paperSet} elevation={3}>
        <Typography className={classes.headingSet} variant="h5" component="h2">
          Add SSID
        </Typography>
        <div className={classes.formDiv}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textFieldName}
              id="abc"
              label="Name"
              name="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={classes.textFieldSsid}
              id="abc"
              label="SSID"
              name="ssid"
              variant="outlined"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
            />
            <Button
              onClick={formsubmit}
              className={classes.btn}
              variant="contained"
              style={{
                
                backgroundColor: "#69c9ef",
                color: "#fff",
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>

      <Paper className={classes.paperSet} elevation={3}>
        <Typography className={classes.headingSet} variant="h5" component="h2">
          Add Department
        </Typography>
        <div className={classes.formDiv}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textFieldName}
              id="abc"
              label="Company"
              name="company"
              variant="outlined"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              className={classes.textFieldSsid}
              id="abc"
              label="Department"
              name="department"
              variant="outlined"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <Button
              onClick={departmentformsubmit}
              className={classes.btn}
              variant="contained"
              style={{
                
                backgroundColor: "#69c9ef",
                color: "#fff",
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
      <CreateUser />
    </div>
  );
};

export default Addssid;
