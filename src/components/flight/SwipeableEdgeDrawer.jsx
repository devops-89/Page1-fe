



import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { shadows } from '@mui/system';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { nunito } from "@/utils/fonts";

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  const FareSummary = props.fairSummary

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height:'45%',
            overflow: 'visible',         
          },
        }}
      />
      {/* sx={{position:"absolute" ,bottom:0,right:0 ,width:"80px"}} */}
        {/* <Button onClick={toggleDrawer(true)} >
      Hello
      
        </Button> */}
   
      {/* <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      > */}

<SwipeableDrawer
        container={container}
        anchor="bottom"
        open={props.toggleDrawer.open} // Controlled by parent state
        onClose={props.toggleDrawer.toggle} // Calls the toggle function
        onOpen={props.toggleDrawer.toggle} // Calls the toggle function
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -65,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
         {props.fairSummary}
          {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography> */}
        </StyledBox>
        <StyledBox sx={{ height: '100%', overflow: 'auto' }}>
          {/* {props.fairSummary} */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
