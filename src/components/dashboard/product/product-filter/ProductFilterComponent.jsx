import React from 'react';

import './ProductFilter.scss';
import CustomSelect from 'components/common/CustomSelect/CustomSelect';
import {useSelector} from 'react-redux';
function ProductFilterComponent() {
    const product = useSelector(state => state.product)
    const {categories,subCategories} = product;
    const sortItems = ['our favorites', 'low to high', 'high to low'];
    const filterItems = [...categories];
  return (
    <div
      className="product-search-wrapper"
    >
        <CustomSelect queryName={'Sort'} label = {'Sort'} options= {sortItems} multiple = {false}/>
        <CustomSelect queryName={'category'} label = {'Category'} options= {filterItems} multiple = {true}/>
        <CustomSelect queryName={'subCategory'} label = {'Sub Category'} options= {subCategories} multiple = {true}/>
    </div>
  );
}

export default ProductFilterComponent;
