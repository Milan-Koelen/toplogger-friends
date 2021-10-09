import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { React } from "react";
import convertGrade from "../features/gradeConversion";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  list: {
    width: "80vw",
    flexDirection: "column",
    display: "flex",
    flexGrow: 1,
    marginLeft: "15vw",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,.85)",
  },
  title: {
    display: "flex",
    margin: theme.spacing(4, "auto", 2),
  },
}));

const Boulders = (props) => {
  const data = props.data;

  // const data = this.props.dataRecentBoulders;

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {props.title}
        </Typography>

        <List
          className={classes.list}
          style={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {data.map((i, idx) => (
            <ListItem dense={true} key={i.TL_ID}>
              <ListItemText
                primary={i.Name}
                secondary={"Grade: " + convertGrade(i.grade)[0]}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Boulders;
