import { ListItemIcon, Typography } from '@material-ui/core';
import React, { useRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import ButtonComponent from '../Button/ButtonComponent';
import './CustomSelect.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCondition } from 'actions/products/productActions';
function CustomSelect({ queryName, label, options, multiple, filterKey }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { filterCondition } = product;
  const [selected, setSelected] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [width, setWidth] = React.useState('0px');
  const ref = useRef();
  // const handleChange = (event) => {
  //   setSelected(event.target.value);
  // };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    setWidth(event.currentTarget.clientWidth);
  };

  const handleClear = () => {
    setSelected([]);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeMultiple = (event, index) => {
    if (selected.includes(options[index])) {
      const ind = selected.indexOf(options[index]);
      const oldSelected = [...selected];
      oldSelected.splice(ind, 1);
      setSelected(oldSelected);
      return;
    }
    setSelected((pre) => [...pre, options[index]]);
  };

  //resize
  React.useEffect(() => {
    const resizeEvent = () => {
      setWidth(ref.current.clientWidth + 'px');
    }
    function resize() {
      window.addEventListener('resize',resizeEvent);
    }
    resize();
    return () => {
      window.removeEventListener('resize',resizeEvent);
    };
  }, []);

  //for multiple
  React.useEffect(() => {
    const changeFilter = () => {
      if (multiple && selected.length > 0) {
        dispatch(setFilterCondition(queryName, selected, filterKey));
      }
    };
    changeFilter();
  }, [multiple,filterKey,queryName,selected]);

  //for single
  React.useEffect(() => {
    const changeFilter = () => {
      if (filterCondition.count === 0 && selectedIndex === 0) return;
      if (!multiple) {
        const conditionData = {};
        if (queryName === 'sort') {
          switch (options[selectedIndex]) {
            case 'popularity':
              conditionData[queryName] = 'desc';
              conditionData['sortBy'] = 'loveCount';
              break;
            case 'low to high':
              conditionData[queryName] = 'asc';
              conditionData['sortBy'] = 'price';
              break;
            case 'high to low':
              conditionData[queryName] = 'desc';
              conditionData['sortBy'] = 'price';
              break;
            case 'relevance':
              conditionData[queryName] = 'desc';
              conditionData['sortBy'] = 'viewsCount';
              break;
            default:
              break;
          }
        }
        dispatch(setFilterCondition(queryName, conditionData, filterKey));
      }
    };
    changeFilter();
  }, [selectedIndex,filterCondition.count,multiple,filterKey,queryName]);

  const selectedName = selected;
  return (
    <>
      <List
        className="product-search-container container"
        component="nav"
        aria-label="Sort settings"
      >
        <ListItem
          ref={ref}
          button
          className="custom-select-btn"
          onClick={handleClickListItem}
        >
          <ListItemText primary={label}></ListItemText>
          <ListItemIcon className="arrows">
            <Icon>expand_more</Icon>
          </ListItemIcon>
        </ListItem>
      </List>

      {multiple ? (
        <Menu
          className="menu-main-wrapper"
          // id="lock-menu"
          elevation={0}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="menu-info" style={{ width: `${width}` }}>
            <div className="info-selected">
              <Typography variant="subtitle2">
                {selectedName.length} selected
              </Typography>
              <div className="selected-names-wrapper">
                {selectedName
                  .slice(Math.max(selected.length - 3, 0))
                  .map((item) => (
                    <span className="selected-name-span">{item}</span>
                  ))}
                {selectedName.length > 3 && (
                  <span className="selected-name-span">
                    {selectedName.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="clear-btn">
              <ButtonComponent
                type="reset"
                handlesubmit={handleClear}
                className="clear-filter"
                value="clear"
                options={{ isSubmitting: false, variantType: 'outlined' }}
              />
            </div>
          </div>
          {options &&
            options.map((name, index) => (
              <MenuItem
                className={
                  selectedName.includes(name)
                    ? 'menu-item menu-item-selected selected-name-span'
                    : 'menu-item'
                }
                key={name}
                name={name}
                onClick={(event) => handleChangeMultiple(event, index)}
              >
                {name}
              </MenuItem>
            ))}
        </Menu>
      ) : (
        <Menu
          className="menu-main-wrapper"
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              style={{ width: `${width}` }}
              className={
                index === selectedIndex
                  ? 'menu-item menu-item-selected'
                  : 'menu-item'
              }
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}

export default CustomSelect;
