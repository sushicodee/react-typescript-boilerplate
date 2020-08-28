import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link,useLocation, useHistory } from 'react-router-dom';
import './Header.scss';
import { Divider, ListItem } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
// import {ArrowBack} from '@material-ui/icons';


interface IHeaderLink {
  name: string;
  path: string;
  iconName:string;
}
interface iProps {

}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Header: React.FC = (props:iProps) => {
  let wrapper = React.createRef();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [toggle, settoggle] = useState(false);
  const toggleClass = toggle ? '-open' : '-close';
  const headerLinks: IHeaderLink[] = [
    { name: 'Home', path: '/' ,iconName:'HomeOutlinedIcon' },
    { name: 'About', path: '/about' ,iconName:'InfoOutlinedIcon' },
  ];
  return (
    <>
      <AppBar>
        <Toolbar className="header-container">
          <>
        {/* {location.pathname !== "/" && (
                <IconButton
                  id="back-button"
                  edge="start"
                  onClick={() => {
                    return history.push("/");
                  }}
                  aria-label={'/'}
                  >
                  <ArrowBack fontSize="large" />
                </IconButton>
                )} */}
          <IconButton
            edge="start"
            onClick={() => settoggle((cur: boolean) => !cur)}
            className="menu-button"
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            Title
          </Typography>
          <Link to="/login">
          <Button color="inherit">Login</Button>
          </Link>
            </>
        </Toolbar>
      </AppBar>
      {/* <div className={`header-links header-links${toggleClass}`}> */}
        <div  className={clsx(classes.list, {
        [classes.fullList]: 'top'
      })}
      role="presentation">
        <IconButton
          edge="start"
          onClick={() => settoggle((cur: boolean) => !cur)}
          className="menu-button"
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
        ref = {(el:any) => {wrapper = el}}
        className = {classes.fullList}
            anchor={'left'}
            open={toggle}
            onClose={() => settoggle(false)}
            onOpen={ () => settoggle(true)}
          >
          {headerLinks.map(({ name, path,iconName }) => (
            <List key={path} className = {classes.list + ' '+'header-link'}>
              <Link to={path} onClick = {() => settoggle(false)}>
                <ListItem>
                <ListItemIcon>
                  <HomeOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={name} />
                </ListItem>
                </Link>
            </List>
          ))}

          </SwipeableDrawer>
      </div>
    </>
  );
};

export default Header;
