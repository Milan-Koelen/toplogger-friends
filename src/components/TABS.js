import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
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
                            <span className={classes.percentage}>
                              {grade[1]}%
                            </span>
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
