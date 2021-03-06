import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import './Header.scss';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  Theme,
  fade,
  createStyles,
} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import OptionsTray from './optionsTray/OptionsTray';
import { fetchCategories } from 'actions/products/productActions';
import ProductSearch from './components/ProductSearch';
// import {ArrowBack} from '@material-ui/icons';

interface IHeaderLink {
  name: string;
  path: string;
  iconName: string;
}

interface IProps {
  isLoggedin?: boolean;
  // logout?:() => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

const Header: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  const { isLoggedin } = props;

  const headerLinks: IHeaderLink[] = [
    { name: 'Home', path: '/', iconName: 'home' },
    { name: 'Dashboard', path: '/dashboard', iconName: 'dashboard' },
    { name: 'About', path: '/about', iconName: 'about' },
    { name: 'divider', path: '', iconName: '' },
    { name: 'Add Product', path: '/add-product', iconName: 'add' },
    { name: 'My Store', path: '/my-products', iconName: 'store' },
    // { name: 'Messages', path: '/messages', iconName: 'chat' },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <AppBar color="transparent" className="header-wrapper">
        <Toolbar className="header-container">
          <>
            {isLoggedin && (
              <IconButton
                edge="start"
                onClick={() => settoggle((cur: boolean) => !cur)}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>
            )}
            <div className="logo">
              <Typography variant="h6" className="title">
                STORE
              </Typography>
            </div>
            {/* <div className = 'search-container'>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>
          </div> */}
            {!isLoggedin ? (
              <Grid className="default-header-auth container">
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="inherit">Sign Up</Button>
                </Link>
              </Grid>
            ) : (
              <OptionsTray />
            )}
          </>
        </Toolbar>
      </AppBar>
      {/* //sidenav */}
      {isLoggedin ? (
        <aside
          className={clsx(classes.list, {
            [classes.fullList]: 'top',
          })}
          role="presentation"
        >
          <SwipeableDrawer
            className={`${classes.fullList} sidebar-wrapper`}
            anchor={'left'}
            open={toggle}
            onClose={() => settoggle(false)}
            onOpen={() => settoggle(true)}
          >
            <div className="sidebar-container wrapper">
              {headerLinks.map(({ name, path, iconName }, index) =>
                name === 'divider' ? (
                  <Divider key={name + index} />
                ) : (
                  <List key={name} className={`${classes.list} header-link container`}>
                    <Link key={name} to={path} onClick={() => settoggle(false)}>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>{iconName}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItem>
                    </Link>
                  </List>
                ),
              )}
              <ProductSearch/>
            </div>
          </SwipeableDrawer>
        </aside>
      ) : null}
    </>
  );
};
export default Header;
