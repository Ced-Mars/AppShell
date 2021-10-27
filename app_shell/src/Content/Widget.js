import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";


const Seq_Dialogue = React.lazy(() => import("RemoteSeq/SeqComm"));
const BP_Display = React.lazy(() => import("RemoteBP/BPApp"));

const useStyles = makeStyles({
  root: {
    width: "inherit",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#A0A2A2",
  },
  spacer: {
    flexGrow: 1,
  },
  closebutton: {
    padding: "-0.5rem",
    width: "10px",
    height: "10px",
  },
  iconbtn: {
    padding: "0px",
  },
}, {index:1});

const renderLoader = () => <p>Loading</p>;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, count: 0};
  }



  static getDerivedStateFromError(error) {
    return {hasError: true};
  }


  render() {
    if (this.state.hasError) {
      return (
        <div style={{flex:1, alignContent:"center" }}>
          <p>Loading failed! Please reload.</p>
        </div>
      );
    }
    return this.props.children;
  }
}




const widgetComponents = {
  a: <Seq_Dialogue/>,
  b: <BP_Display/>,
};

const widgetNames = {
  a: "Tâches Séquenceur",
  b: "Build Process Display",
};

export default function Widget({ id, onRemoveItem, affichage }) {
  const classes = useStyles();
  return ( 
    <Card className={classes.root}>
      <div className={classes.header}>
        <Box component="div" visibility={affichage} style={{position:"absolute", left:0}}>
          <IconButton
            aria-label="delete"
            className={classes.iconbtn}
            onClick={() => onRemoveItem(id)}
          >
            <CloseIcon className={classes.closebutton} />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" gutterBottom style={{margin:"2px"}} >
          {widgetNames[id]}
        </Typography>
      </div>
      <ErrorBoundary>
        <React.Suspense fallback={renderLoader()}>
          {widgetComponents[id]}
        </React.Suspense>
      </ErrorBoundary>
    </Card>
  );
}
