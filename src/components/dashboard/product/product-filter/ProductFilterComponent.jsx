import React ,{useMemo}from 'react';
import './ProductFilter.scss';
import CustomSelect from 'components/common/CustomSelect/CustomSelect';
import {useSelector} from 'react-redux';
function ProductFilterComponent() {
    const product = useSelector(state => state.product)
    const {attributes:{category,brand}} = product;
    const sortItems = useMemo(() => ['Relevance','Popularity', 'low to high', 'high to low'],[]);
  return (
    <div
      className="product-search-wrapper"
    >
        <CustomSelect filterKey = {'options'} queryName={'sort'} label = {'Sort'} options= {sortItems} multiple = {false}/>
        <CustomSelect filterKey = {'filters'} queryName={'category'} label = {'Category'} options= {category} multiple = {true}/>
        <CustomSelect filterKey = {'filters'} queryName={'brand'} label = {'Brand'} options= {brand} multiple = {true}/>
        {/* <CustomSelect queryName = {'color'} label = {'Color'} options = {color} multiple = {false}/> */}
    </div>
  );
}

export default React.memo(ProductFilterComponent);
