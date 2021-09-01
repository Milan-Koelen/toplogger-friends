import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Link,
  ListItemSecondaryAction,
  Container,
  List,
  Paper,
  ListItemAvatar,
  ListItem,
  Grid,
  Typography,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { selectFollowing, fetchFollowing } from "../features/followingSlice";
import { selectUser } from "../features/userSlice";
import { RemoveCircle } from "@material-ui/icons/RemoveCircleOutline";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = useSelector(selectFollowing);
  console.log(data);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [
    dispatch,
    user.token,
    user.name,
    user.TL_Grade,
    user.following,
    user.TL_ID,
  ]);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: "100%",
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
      textAlign: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Container style={{ paddingTop: "50px" }}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper style={{ maxHeight: "73vh", overflow: "auto" }}>
          <Container>
            <Typography variant="h6" className={classes.title}>
              {" "}
              Leaderboard
            </Typography>
          </Container>
          <List>
            {data.map((i, idx) => (
              <ListItem component={Link} to={"/user/" + i.TL_ID}>
                <ListItemAvatar>
                  <Avatar
                    className="profilepicture"
                    src={i.ProfilePictureURL}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "image_path_here";
                    }}
                    alt={"no_img"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={i.Name}
                  secondary={"Grade: " + i.Grade}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">{/* <RemoveCircle /> */}</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Container>
  );
};
export default Leaderboard;
