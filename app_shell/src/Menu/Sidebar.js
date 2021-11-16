import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';

const Seq_Exe = React.lazy(() => import("RemoteSeq/SeqLaunch"));

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

export default function Sidebar({
  drawerState,
  toggleDrawer
  }) {

  return (
    <div>
        <React.Fragment>
          <Drawer
            anchor={'top'}
            open={drawerState}
            onClose={toggleDrawer}
          >
            <Box
              sx={{ width: 'auto', display:"flex", height:"auto", justifyContent:"center", alignItems:"center", margin:"20px"}}
              role="presentation"
            >
              <ErrorBoundary>
                <React.Suspense fallback={renderLoader()}>
                  <Seq_Exe/>
                </React.Suspense>
              </ErrorBoundary>
            </Box>
          </Drawer>
        </React.Fragment>
    </div>
  );
}