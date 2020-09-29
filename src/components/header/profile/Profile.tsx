// import React , {useState,useRef} from 'react';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { Icon, Avatar, Typography } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { logout } from './../../../actions/user/authActions';
// import './Profile.scss';
// import { CSSTransition } from 'react-transition-group';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     paper: {
//       marginRight: theme.spacing(2),
//     },
//     small: {
//       width: theme.spacing(3),
//       height: theme.spacing(3),
//     },
//   }),
// );

// const Profile = (props) => {
//   const history = useHistory();
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const anchorRef = useRef<HTMLButtonElement>(null);
//   const [menuHeight, setMenuHeight] = useState(null);
//   const [isConnected, setConnected] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('main');
//   const dropdownRef = useRef(null);
//   const imageSrc = process.env.REACT_IMAGE_URL;
  
//   React.useEffect(() => {
//   }, []);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   function calcHeight(el) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

//   const handleProfile = () => {
//     history.push('/profile');
//   };
//   const handleLogout = () => {
//     props.logout();
//     history.push('/login');
//   };

//   const handleSettings = () => {
//     history.push('/settings');
//   };

//   const handleClose = (event: React.MouseEvent<EventTarget>) => {
//     if (
//       anchorRef.current &&
//       anchorRef.current.contains(event.target as HTMLElement)
//     ) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event: React.KeyboardEvent) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current!.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <div className={classes.root}>
//       <div>
//         <Button
//           className="btn-Profile"
//           ref={anchorRef}
//           aria-controls={open ? 'menu-list-grow' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//           color={'primary'}
//         >
//           <Icon className="circle-icon">account_circle</Icon>
//         </Button>
//         <>
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           transition
//           disablePortal
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === 'bottom' ? 'center top' : 'center bottom',
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList
//                     className="profile-list"
//                     autoFocusItem={open}
//                     id="menu-list-grow"
//                     onKeyDown={handleListKeyDown}
//                   >
//                     <MenuItem onClick={handleProfile}>
//                       <Avatar
//                         className={classes.small}
//                         alt={props.auth.user.username}
//                         src={`${imageSrc}/${props.auth.user.image}`}
//                       />
//                       <Typography variant="subtitle2">Profile</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={handleSettings}>
//                       <Icon>settings</Icon>
//                       <Typography variant="subtitle2">Settings</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={handleLogout}>
//                       <Icon>logout</Icon>
//                       <Typography variant="subtitle2">Logout</Typography>
//                     </MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>

//         <CSSTransition
//           in={activeMenu === 'settings'}
//           unmountOnExit
//           timeout={500}
//           classNames="list-secondary"
         

//         ></CSSTransition>
//         </>
//       </div>
//     </div>
//   );
// };

// function NavItem(props) {
//   const [open, setOpen] = useState(false);

//   return (
//     <li className="nav-item">
//       <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
//         {props.icon}
//       </a>
//       {open && props.children}
//     </li>
//   );
// }
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React from 'react'

function Profile() {
  return (
    <div>
      
    </div>
  )
}

export default Profile
