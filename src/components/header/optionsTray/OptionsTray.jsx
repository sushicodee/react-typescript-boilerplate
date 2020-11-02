import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Avatar, Icon, Typography } from '@material-ui/core';
import './OptionsTray.scss';
import { logout } from 'actions/user/authActions';
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Theme from 'components/common/Theme/Theme';
function OptionsTray(props) {
  
  return (
    <Navbar>
      <NavItem icon={'favorite_border'} path = {'/favorites'}/>
      <NavItem icon={'shopping_cart'} path = {'/cart'}/>
      <NavItem icon={'person'}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const history = useHistory();
  const cartItems = useSelector(state => state.cart.cartItems)
  function handleNavigation(path) {
    history.push(path);
  }
  const [open, setOpen] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
    <li className="nav-item">
      <button className="icon-button" onClick={() => props.path ? handleNavigation(props.path):setOpen(!open)}>
        <Icon>{props.icon}</Icon>
      </button>
      {props.path ==='/cart' && cartItems.length ?
                <span className = "cart-count">{cartItems.length}</span> 
                :null
      }      
      {open && props.children}
    </li>
      </ClickAwayListener>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const history = useHistory();
  const imageSrc = process.env.REACT_APP_IMAGE_URL;
  const auth = useSelector(state => state.auth)
 const dispatch = useDispatch();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 50);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + el.firstChild.clientHeight;
    setMenuHeight(height);
  }

  function handleLogout() {
    dispatch(logout());
    history.push('/login');
  }

  function handleNavigation(path) {
    history.push(path);
  }

  function DropdownItem(props) {
    return (
      <span
        className="menu-item"
        onClick={() =>
          props.handleItemClick
          ? props.handleItemClick()
          : props.goToMenu && setActiveMenu(props.goToMenu)
        }
        >
        {props.leftIconComponent ? (
          <span className="icon-button">
            <span className="icon-left icon">{props.leftIconComponent}</span>
          </span>
        ) : (
          <span className="icon-button">
            <Icon className="icon-left">{props.leftIcon}</Icon>
          </span>
        )}
        {props.label && props.label}
        {props.children}
        <span className="icon-right">
          <Icon>{props.rightIcon}</Icon>
        </span>
      </span>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            handleItemClick={() => handleNavigation('/profile')}
            leftIconComponent={
              <Avatar
                alt={auth && auth.user.username}
                src={`${imageSrc}/${auth && auth.user.image}`}
                width={'20px'}
                height={'20px'}
              />
            }
          >
            <span>
              <Typography variant="h6">{auth && auth.user.username}</Typography>
              See your Profile
            </span>
          </DropdownItem>
          <DropdownItem
            leftIcon={'settings'}
            rightIcon={'chevron_right'}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={'brightness_medium'}
            rightIcon={'chevron_right'}
            goToMenu="displaySettings"
          >
            Display Preferences
          </DropdownItem>
          <DropdownItem handleItemClick={handleLogout} leftIcon="logout">
            Logout
          </DropdownItem>
         </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={'chevron_left'}>
            <h2>Profile</h2>
          </DropdownItem>
          <DropdownItem leftIcon={'settings'}>Setting 1</DropdownItem>
          <DropdownItem leftIcon={'settings'}>Setting 2</DropdownItem>
          <DropdownItem leftIcon={'settings'}>Setting 3</DropdownItem>
          <DropdownItem leftIcon={'settings'}>Setting 4</DropdownItem>
         
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'displaySettings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={'chevron_left'}>
            <h2>Profile</h2>
          </DropdownItem>
          <DropdownItem leftIcon={'settings'} label = 'Toggle Theme'><Theme/></DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });


export default (OptionsTray);
