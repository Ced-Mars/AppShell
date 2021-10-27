import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function Choix({ editable }) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    editable();
  };

  return (
    <>
      <FormControlLabel style={{margin:0}}
        control={
          <Switch color="primary" onChange={handleChange}>
            checked={state.checkedB}
            name="checkedA" 
          </Switch>
        }
      />
    </>
  );
}
