import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Content from "./Content/Contenu";
import Header from "./Navigation/Header";

const drawerWidth = 240;

const originalItems = ["a", "b"];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function App() {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);


  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [items, setItems] = useState(
    getFromLSitems("tableau") || originalItems
  );
  const onRemoveItem = (itemId) => {
    setItems(items.filter((i) => i !== itemId));
  };

  const onAddItem = (itemId) => {
    setItems([...items, itemId]);
  };

  useEffect(() => {
    saveToLSitems("tableau", items);

  }, [items]);

  const [isDraggable, setDraggable] = useState(
    false
  );

  const[affichage, setAffichage] = useState(
      "hidden"
  );

  const[hideResizable, setHideResizable]= useState(
      "react-resizable-hide"
  );

  const editable = () => {
    setDraggable(!isDraggable);
    if(affichage === "hidden"){
      setAffichage("visible");
    }else{
      setAffichage("hidden");
    }
    if(hideResizable === "react-resizable-hide"){
      setHideResizable("")
    }else{
      setHideResizable("react-resizable-hide")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          items={items}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
          originalItems={originalItems}
          editable={editable}
        />
        <main
          className={classes.content}
        >
          <div className={classes.drawerHeader} />
          <Content 
          isDraggable={isDraggable}
          items={items}
          onRemoveItem={onRemoveItem}
          hideResizable={hideResizable}
          affichage={affichage}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}


function getFromLSitems(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("itemstest1")) || {};
    } catch (e) {}
  }
  return ls[key];
}

function saveToLSitems(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "itemstest1",
      JSON.stringify({
        [key]: value
      })
    );
  }
}