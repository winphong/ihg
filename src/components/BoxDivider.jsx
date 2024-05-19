import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const BoxDivider = () => {
  const classes = useStyles();

  return <div className={classes.divider} />;
};

const styles = () => ({
  divider: {
    position: "absolute",
    width: `calc(100% + 2px)`,
    borderRight: "2px solid #C8B06B",
    borderLeft: "2px solid #C8B06B",
    height: "100px",
    top: "25%",
  },
});
const useStyles = makeStyles(styles);

export default BoxDivider;
