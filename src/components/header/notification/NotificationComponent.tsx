import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as io from 'socket.io-client';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function Notification() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [isConnected, setConnected] = React.useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      
      setOpen(false);
    };
    
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
    
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    
    prevOpen.current = open;
  }, [open]);
  
//   React.useEffect(() => {
//     const socket = io(process.env.REACT_APP_SOCKET_URL);
//     socket.emit('connect', 'notification requested from react');
//     socket.on('notifications', (data) => {
//       setConnected(true);
//       console.log('res from server', data);
//     });
//     socket.on('connection', (data) => {
//       console.log(data);
//     });
// }, [process.env.REACT_APP_SOCKET_URL,isConnected]);


  return (
    <div className={classes.root}>
      <div>
        <Button
          className='btn-notification'
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color = {"primary"}
        >
          <Icon className = 'notification-icon'>
            notification_important
          </Icon>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
