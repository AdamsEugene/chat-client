import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";
import InfoIcon from "@material-ui/icons/Info";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" p={0}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  root1: {
    color: "#888",
  },
}));

export default function Taps({ Users, user, Friends, friend }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div style={{ width: "300px" }}>
        <Tabs
          component="div"
          className={classes.root1}
          value={value}
          onChange={handleChange}
          //   variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label={user}
            component="div"
            icon={user === "About User" ? <InfoIcon /> : <PersonIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label={friend}
            component="div"
            icon={friend === "Groups" ? <GroupIcon /> : <FavoriteIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
      </div>
      <TabPanel component="div" value={value} index={0}>
        {Users}
      </TabPanel>
      <TabPanel component="div" value={value} index={1}>
        {Friends}
      </TabPanel>
    </div>
  );
}
