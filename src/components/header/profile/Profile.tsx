import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Icon, Avatar, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './../../../actions/user/authActions';
import './Profile.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

 const Profile = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [isConnected, setConnected] = React.useState(false);
  const imageSrc = process.env.REACT_IMAGE_URL;
  React.useEffect(() => {
    console.log(props.auth)
  }, [])
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleProfile = () => {
    history.push('/profile')
  }
  const handleLogout = () => {
    props.logout();
    history.push('/login');
  };

  const handleSettings = () => {
    history.push('/settings')
  }

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

  return (
    <div className={classes.root}>
      <div>
        <Button
          className="btn-Profile"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color={'primary'}
        >
          <Icon className ='profile-icon'>account_circle</Icon>
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
                    className = 'profile-list'
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                    <MenuItem onClick = {handleProfile}>
                    <Avatar className={classes.small} alt={props.auth.user.username} src={`${imageSrc}/${props.auth.user.image}`} />
                    <Typography variant = 'subtitle2'>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleSettings}>
                      <Icon>
                        settings
                      </Icon>
                    <Typography variant = 'subtitle2'>Settings</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Icon>
                        logout
                      </Icon>
                    <Typography variant = 'subtitle2'>Logout</Typography>
                    </MenuItem>

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
const mapStateToProps = state => ({
  auth:state.auth
})
const mapDispatchToProps = dispatch => ({
  logout:() => dispatch(logout()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)