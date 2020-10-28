import { ListItemIcon, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import ButtonComponent from '../Button/ButtonComponent';
import './CustomSelect.scss';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { fetchSubCategories,setFilterCondition, searchProducts, setSelectedCategories, setSelectedSubCategories, fetchAttributes } from 'actions/products/productActions';
import { Category } from '@material-ui/icons';
function CustomSelect({queryName, label, options, multiple }) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product)
  const{filterCondition} = product;
  const [selected, setSelected] = React.useState([]);
  const [previousSelected, setpreviousSelected] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  // const prevCondition = usePrevious(selectedSub)

  // React.useEffect(() => {
  //   // if(queryName === 'subCategory' && prevCondition.filterCondition.categories.length!== filterCondition && filterCondition.categories.length){
  //   //       setSelected([])
  //   // }
  //   console.log({prevCondition,filterCondition})
  // }, [filterCondition && filterCondition.categories])

  const params = useParams();
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
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

  function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  //for multiple
  React.useEffect(() => {
    const changeFilter = () => {
      const conditionData = Object.assign({},filterCondition[queryName],params);
      conditionData[queryName] = selected;
      Object.keys(conditionData).forEach(key => conditionData[key] === undefined ? delete conditionData[key] : {});
      dispatch(setFilterCondition(conditionData))
      // dispatch(searchProducts(conditionData))

  }
  changeFilter();
  }, [selected,filterCondition[queryName]])

  //for single
  React.useEffect(() => {
    const changeFilter = () => {
      const conditionData = Object.assign({},params);
      if(queryName === 'sort'){
        switch(options[selectedIndex]){
          case 'popularity':
            conditionData['sortBy'] = 'loveCount'
            conditionData[queryName] = 'desc'
            break;
          case 'low to high':
            conditionData[queryName] = 'asc'
            conditionData['sortBy'] = 'price'
            break;
          case 'high to low':
            conditionData[queryName] = 'desc'
            conditionData['sortBy'] = 'price'
            break;
          case 'relevance':
            conditionData[queryName] = 'views'
            conditionData['sortBy'] = 'views'
            break;  
          default:break;
        }
      }
      Object.keys(conditionData).forEach(key => conditionData[key] === undefined ? delete conditionData[key] : {});
      dispatch(setFilterCondition(conditionData))
      // dispatch(searchProducts(conditionData))
  }
  changeFilter();
  }, [selectedIndex,filterCondition[queryName]])
  
  const selectedName = selected;
  return (
    <>
      <List
        className="product-search-container container"
        component="nav"
        aria-label="Sort settings"
      >
        <ListItem button className= 'custom-select-btn'  onClick={handleClickListItem}>
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
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="menu-info">
            <div className = 'info-selected'>
            <Typography variant="subtitle2">
              {selectedName.length} selected
            </Typography>
            <div className ='selected-names-wrapper'>
              {selectedName.slice(Math.max(selected.length - 3, 0)).map((item) =><span className = 'selected-name-span'>{item}</span>)}
              {selectedName.length > 3 && <span className = 'selected-name-span'>{selectedName.length-3} more</span>}
            </div>
            </div>
            <div className = 'clear-btn'>
            <ButtonComponent
              type="reset"
              handlesubmit={handleClear}
              className="clear-filter"
              value="clear"
              options={{ isSubmitting: false ,variantType:'outlined' }}
            />
            </div>
          </div>
          {options && options.map((name, index) => (
            <MenuItem
              className={
                selectedName.includes(name)
                  ? 'menu-item menu-item-selected'
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
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              className = {index === selectedIndex ? 'menu-item menu-item-selected':'menu-item'}
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
