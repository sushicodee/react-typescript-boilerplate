import React, { useState, useEffect, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {  Button, Icon, Collapse } from '@material-ui/core';
// import './ProductSearch.scss'
import {useSelector} from 'react-redux';


function ProductSearch() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [categories,setCategories] = useState([])
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(''); 
  const product = useSelector(state => state.product)
  const {mainCategories} = product;
  useEffect(() => {
    setCategories(mainCategories && mainCategories[2]['Women']);
    setTitle('Categories');
  }, [mainCategories]);

  const handleClick = (cat) => {
    setOpen(!open);
    if(!open){
      setTitle(cat)
    }else{
        setTitle('Categories');
    }
  };
  
  const handleClose = () => {
    setTitle('Categories');
    setOpen(false)
  }

  const filterSubCategory = (category) => {
    console.log(category)
    // setSubCategory(mainCategories[2]['Women'][0][category]);
    handleClick(category);
};

  const handleCategoryChange = (e: any, cat, name) => {
    if (name === 'category') {
        filterSubCategory(cat[0]);
        setSelectedCategory(cat);
    }
  };
  return (
    <List>
      <ListItem>
        {open && <Button className = 'btn-title' onClick = {handleClose}>
        <Typography variant="subtitle2">{title}</Typography>
            <Icon>
                chevron_left
            </Icon>
            </Button>
        }
        {!open && <Typography variant="subtitle1">{title.toUpperCase()}</Typography>}
      </ListItem>
      <Collapse className ='main-list' in={!open} timeout='auto' unmountOnExit>
      {
        categories.map((catObj,ind) => {
            return (
                <ListItem key={ind} className='list-item'>
                  <Link className='cat-link' to = {`/products/search/${Object.keys(catObj)[0]}`}>
                  {Object.keys(catObj)[0]}
                  </Link>
                  {/* <Icon onClick={(e) => handleCategoryChange(e, Object.values(catObj), 'category')}>
                    chevron_right
                  </Icon> */}
                </ListItem>
            );
          })
      }  
          </Collapse>
      <Collapse in={open} timeout='auto' unmountOnExit>
      {subCategory && subCategory.map((subObj:any,ind: any) => {
        return (
            <ListItem className = 'sub-list' key={ind}>
            <Link className='cat-link' to = {`/products/search/${selectedCategory}/${Object.keys(subObj)[0]}`}>
              {Object.keys(subObj)[0]}
            </Link>
              </ListItem>
        );
      })
    }
    </Collapse>
    </List>
  );
}

export default ProductSearch;
