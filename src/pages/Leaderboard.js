// import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Avatar,
  // IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { React } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion.js";
import { selectUser } from "../features/userSlice";

const useStyles = makeStyles(theme => ({
  table: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: theme.spacing(2),
    borderBottom: "none",
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "rgba(18,18,18,.05)",
    backdropFilter: "blur(8px)",
  },
  profilepicture: {
    marginRight: "5vw",
  },
  title: {
    display: "flex",
    margin: theme.spacing(3, "auto"),
  },
  link: {
    cursor: "pointer",
  },
  tableCell: {
    borderBottom: "none",
  },
  percentage: {
    fontSize: ".8em",
    color: theme.palette.grey[70],
    verticalAlign: "center",
    marginLeft: ".5em",
  },
}));

const Leaderboard = () => {
  const user = useSelector(selectUser);
  const data = useSelector(selectFollowing);
  const history = useHistory();
  const sortableData = data.map(x => x);

  // const handleUnfollow = e => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: user.token,
  //     },
  //     body: JSON.stringify({ unfollow: e.currentTarget.value }),
  //   };
  //   fetch(URL + "/unfollow", requestOptions)
  //     .then(response => response.json())
  //     .then(console.log("user deleted"));
  // };

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Leaderboard
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Friends" {...a11yProps(0)} />
        <Tab label="All Gyms" {...a11yProps(1)} />
      </Tabs>

      <TableContainer>
        <Table className={classes.table} size="small">
          <TableBody>
            {sortableData
              .sort((a, b) => (a.Grade > b.Grade ? -1 : 1))
              .map((i, idx) => {
                const grade = convertGrade(i.Grade);

                return (
                  <TableRow
                    key={i.idx}
                    className={classes.link}
                    onClick={() => history.push("/user/" + i.TL_ID)}
                  >
                    <TableCell padding="none" className={classes.tableCell}>
                      {Number.parseInt(idx) + 1}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Avatar src={i.ProfilePictureURL}></Avatar>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {i.Name}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {grade[0]}
                      {grade[1] !== 0 && (
                        <span className={classes.percentage}>{grade[1]}%</span>
                      )}
                    </TableCell>
                    {/* <TableCell padding="none">
                      <IconButton
                        edge="end"
                        aria-label="follow"
                        value={i._id}
                        onClick={handleUnfollow}
                        size="large"
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Leaderboard;
