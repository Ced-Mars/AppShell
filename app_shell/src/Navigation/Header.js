import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness2";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "./Notification";
import AddList from "./AddList";
import Choix from "./Choix";
import Sidebar from "../Menu/Sidebar";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  rightIcons: {
    marginLeft: theme.spacing(0.5)
  },
  spacer: {
    flexGrow: 1
  }
}));

export default function Header({
  toggleDarkMode,
  darkMode,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  editable,
}) {
  const classes = useStyles();

  //For the Drawer
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(!drawerState);
  };

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>

        <Typography variant="h6" noWrap>
          Projet Mars
        </Typography>

        <Sidebar drawerState={drawerState}
          toggleDrawer={toggleDrawer()}/>

        <div className={classes.spacer} />

        <Button 
          variant="contained"
          onClick={toggleDrawer()}
          color="inherit"
        >
          Lancer Process
        </Button>

        <div className={classes.spacer} />

        <AddList
          items={items}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
          originalItems={originalItems}
          
        />
        
        <Choix
          editable={editable}
        />
        
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDarkMode}
          edge="start"
          className={classes.rightIcons}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Notification/>


      </Toolbar>
    </AppBar>
  );
}
