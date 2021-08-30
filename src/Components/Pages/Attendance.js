import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { db } from "../Firebase/Fire";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Progressbar from "../Progressbar/Progressbar";
import "../Pages/style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    "& .Mui-selected": {
      backgroundColor: "#ee948f",
    },
  },
  table: {
    minWidth: 400,
    width: "400",
  },
  callState: {
    left: "20px",
    top: "16px",
    width: "200px",
  },
  callHeading: {
    paddingLeft: "1.1em",
    fontSize: "30px",
    color: "black",
    fontWeight: "500",
  },
  setSegment: {
    display: "flex",
    justifyContent: "flex-end",
  },
  setAllUser: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  divSetting: {
    display: "flex",
    width: "100%",
  },
  headingSet: {
    width: "55%",
    marginLeft: "35px",
    display: "flex",
    alignItems: "center",
  },
  dropdownDiv: {
    width: "8%",
    marginLeft: "10px",
    marginRight: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
    },
    [theme.breakpoints.down("md")]: {
      width: "25%",
    },
  },
}));

const Employee = () => {
  const classes = useStyles();
  const [emp, setEmp] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [renderfilter, setRenderFilter] = useState(false);
  const [renderTodayFilter, setRenderTodayFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //DateFilter
  const DateFilterBtn = (e) => {
    const startDateConvert = moment(startDate).format("DD MMM YYYY");
    const date = new Date(startDateConvert);
    const sD = date.getTime();
    const endDateConvert = moment(endDate).format("DD MMM YYYY");
    const enddate = new Date(endDateConvert);
    const eD = enddate.getTime();
    const filterbydates = [];
    console.log(filterbydates);
    emp.forEach((dates) => {
      if (dates.checkin <= eD && dates.checkin >= sD) {
        filterbydates.push(dates);
      }
    });
    setEmp(filterbydates);
  };

  const resetFilter = (e) => {
    setRenderTodayFilter(!renderTodayFilter);
    setRenderFilter(!renderfilter);
    setSearchFilter("");
    setStartDate("");
    setEndDate("");
  };
  const handlefilter = (e) => {
    if (e.target.value === "today") {
      setRenderTodayFilter(!renderTodayFilter);
    } else if (e.target.value === "all") {
      setRenderFilter(!renderfilter);
    } else {
      setDepartment(e.target.value);
      const filterbydepartment = [];

      db.collection("attendance")
        .where("department", "==", e.target.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            filterbydepartment.push(doc.data());
          });
          setEmp(filterbydepartment);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const handleSearch = (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      setSearchFilter(e.target.value);
      const filterbyName = [];

      db.collection("attendance")
        .where("name", "==", e.target.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            filterbyName.push(doc.data());
          });
          setEmp(filterbyName);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const fetchAttendanceByToday = async () => {
    const date = new Date();
    const abc = date.getTime();
    const hourToMili = 86400000;
    const checkInCompare = abc - hourToMili;

    const attendaceData = [];
    const response = db.collection("attendance");
    const data = await response.where("checkin", ">=", checkInCompare).get();
    data.docs.forEach((attendace) => {
      attendaceData.push(attendace.data());
    });
    setEmp(attendaceData);
  };

  const fetchAttendance = async () => {
    const attendaceData = [];
    const response = db.collection("attendance");
    const data = await response.orderBy("checkin", "desc").get();
    data.docs.forEach((attendace) => {
      attendaceData.push(attendace.data());
    });
    setEmp(attendaceData);
  };

  useEffect(() => {
    fetchAttendance();
  }, [renderfilter]);

  useEffect(() => {
    fetchAttendanceByToday();
  }, [renderTodayFilter]);

  useEffect(() => {
    const attendaceData = [];
    db.collection("department")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((attendace) => {
          attendaceData.push(attendace.data().department);
        });
        setSelectDepartment(attendaceData);
      });
  }, []);

  return (
    <div>
      <div className={classes.divSetting}>
        <div className={classes.headingSet}>
          <Typography variant="h4" component="h2">
            Attendance
          </Typography>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search by Name"
            variant="outlined"
            value={searchFilter}
            onChange={(e) => handleSearch(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={classes.dropdownDiv}>
          <FormControl variant="outlined" className={classes.dropdownSelect}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Deaprtment
            </InputLabel>
            <Select onChange={(e) => handlefilter(e)} native label="Deaprtment">
              <option aria-label="None" value="today">
                Today
              </option>
              <option aria-label="None" value="all">
                All
              </option>
              {selectDepartment.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <form style={{ display: "flex" }} noValidate>
            <TextField
              style={{ marginRight: "10px" }}
              id="date"
              label="Start Date"
              variant="outlined"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setRenderFilter(!renderfilter);
              }}
              defaultValue="dd-mm-yyyy"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              name="endDate"
              variant="outlined"
              type="date"
              defaultValue="dd-mm-yyyy"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setRenderFilter(!renderfilter);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "#69c9ef",
                color: "#fff",
              }}
              variant="contained"
              onClick={DateFilterBtn}
            >
              Search
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "#69c9ef",
                color: "#fff",
              }}
              variant="contained"
              onClick={resetFilter}
            >
              Reset
            </Button>
          </form>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <h4>Total Record: {emp.length}</h4>
      </div>
      <Divider style={{ marginBottom: "10px", height: "2px" }} />
      <div className={classes.setAllUser}>
        <TableContainer style={{ borderRadius: "10px" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Name
                </TableCell>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Email
                </TableCell>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Department
                </TableCell>
                {/* <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Pin
                </TableCell>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Mac Address
                </TableCell> */}
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Check In
                </TableCell>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Check Out
                </TableCell>
                <TableCell style={{ width: "10%", fontWeight: "600" }}>
                  Total Hours
                </TableCell>
                {/* <TableCell
                  align="center"
                  style={{ width: "10%", fontWeight: "600" }}
                >
                  Actions
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {emp.map((user, key) => {
                const checkIn = user.checkin;
                const checkOut = user.checkout;

                const timeConvertIn = moment(checkIn).format(
                  "DD MMM YYYY hh:mm a"
                );
                const timeConvertOut = moment(checkOut).format(
                  "DD MMM YYYY hh:mm a"
                );
                const st = new moment(timeConvertIn);
                const et = new moment(timeConvertOut);
                var duration = moment.duration(et.diff(st));
                var min = duration.asHours();
                var roundHour = Math.round(min);
                var percentage = (roundHour / 9) * 100;
                if (percentage > 100) {
                  percentage = 100;
                }
                console.log(checkOut)
                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    {/* <TableCell>{user.pin}</TableCell>
                    <TableCell>{user.mac}</TableCell> */}
                    <TableCell>{timeConvertIn}</TableCell>
                    <TableCell>
                      {checkOut == undefined ? "--" : timeConvertOut}
                    </TableCell>
                    <TableCell>
                      {roundHour < 9 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              width: "35px",
                              height: "35px",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            {roundHour}
                          </div>
                          <Progressbar color={"red"} value={percentage} />
                        </div>
                      ) : roundHour == 9 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              color: "white",
                              backgroundColor: "green",
                              width: "35px",
                              height: "35px",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            {roundHour}
                          </div>
                          <Progressbar color={"green"} value={percentage} />
                        </div>
                      ) : roundHour >= 10 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              color: "white",
                              backgroundColor: "orange",
                              width: "35px",
                              height: "35px",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            {roundHour}
                          </div>
                          <Progressbar color={"orange"} value={percentage} />
                        </div>
                      ) : null}
                    </TableCell>
                    {/* <TableCell>{Math.round(min) + "h"}</TableCell> */}
                    {/* <TableCell align="right">
                    <IconButton aria-label="Edit">
                      <EditIcon style={{ color: "#c26d69" }} />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon style={{ color: "#c26d69" }} />
                    </IconButton>
                  </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "0.1%",
        }}
      >
        {/* <Pagination page={page} onChange={nextPage} color="primary" /> */}
        {/* <Grid item>
          <IconButton onClick={getPrev} disabled={isStart}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={getNext} disabled={isEnd}>
            <NavgateNextIcon />
          </IconButton>
        </Grid> */}
      </div>
    </div>
  );
};

export default Employee;
