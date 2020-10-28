import React ,{useEffect,useMemo}from 'react';
import './ProductFilter.scss';
import CustomSelect from 'components/common/CustomSelect/CustomSelect';
import {useSelector,useDispatch} from 'react-redux';
import { fetchAttributes, searchProducts } from 'actions/products/productActions';
function ProductFilterComponent() {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    const {attributes:{category,brand,color}} = product;
    const sortItems = useMemo(() => ['Relevance','Popularity', 'low to high', 'high to low']);
    useEffect(() => {
      // dispatch(searchProducts())
      // dispatch(fetchAttributes())
    }, [])
  return (
    <div
      className="product-search-wrapper"
    >
        <CustomSelect queryName={'Sort'} label = {'Sort'} options= {sortItems} multiple = {false}/>
        <CustomSelect queryName={'category'} label = {'Category'} options= {category} multiple = {true}/>
        <CustomSelect queryName={'brand'} label = {'Brand'} options= {brand} multiple = {true}/>
        {/* <CustomSelect queryName = {'color'} label = {'Color'} options = {color} multiple = {false}/> */}
    </div>
  );
}

export default React.memo(ProductFilterComponent);
