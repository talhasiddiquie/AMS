import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

// Inspired by the former Facebook spinners.

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginLeft: "10px",
  },
});

export default function CustomizedProgressBars({ value, color }) {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }))(LinearProgress);
  return (
    <div className={classes.root}>
      <BorderLinearProgress color={color} variant="determinate" value={value} />
    </div>
  );
}
