import React, { useState, useEffect, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {  Button, Icon, Collapse } from '@material-ui/core';
import './ProductSearch.scss'


function ProductSearch({category,allData}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [subCategory, setSubCategory] = useState([{}]);
  const [selectedCategory,setSelectedCategory] = useState(''); 
  useEffect(() => {
    setTitle('Categories');
  }, []);

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
    let subCategories: string[] = [];
    subCategories = allData.filter((item:any) => 
            item.category === category
            )
    const sub:any = [];
    subCategories.forEach((data:any) => {
      if(data.subCategory && sub.includes(data.subCategory)){
      }
      else{
        sub.push(data.subCategory)
      }
    })
    setSubCategory(sub.filter(data => data));
    handleClick(category);
};

  const handleCategoryChange = (e: any, cat, name) => {
    if (name == 'category') {
        filterSubCategory(cat);
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
          category.map((cat) => {
            return (
                <ListItem key={cat}>
                  <Link className='cat-link' to = {`/products/search/${cat}`}>
                  {cat}
                  </Link>
                  <Icon onClick={(e) => handleCategoryChange(e, cat, 'category')}>
                    chevron_right
                  </Icon>
                </ListItem>
            );
          })
      }  
          </Collapse>
      <Collapse in={open} timeout='auto' unmountOnExit>
      {subCategory && subCategory.map((cat: any) => {
        return (
            <ListItem className = 'sub-list' key={cat}>
            <Link className='cat-link' to = {`/products/search/${selectedCategory}/${cat}`}>
              {cat}
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
