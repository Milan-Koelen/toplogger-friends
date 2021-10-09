import {
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { React } from "react";
import convertGrade from "../features/gradeConversion";

const useStyles = makeStyles(theme => ({
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

const Boulders = props => {
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
            <ListItem
              dense={true}
              component={Link}
              to={"/user/" + i.TL_ID}
              key={i.TL_ID}
            >
              <ListItemText
                primary={i.Name}
                secondary={"Grade: " + convertGrade(i.grade)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Boulders;
