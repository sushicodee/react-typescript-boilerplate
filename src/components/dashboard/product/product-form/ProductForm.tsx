import React, { Component } from 'react';
import FormBuilder from 'components/common/FormBuilder/FormBuilder';
interface IProps {}
interface IState {
}
const defaultForm = {
  productForm:[
    {key:'image',label:'Upload Photo',type:'file', props:{multiple:false}},
    {key:'name',label:'Name',props:{required:true}},
    {key:'price',label:'Price',type:'number',props:{required:true ,currency:'Rs' }},
    {key:'category',label:'Category',props:{required:true}},
    {key:'subCategory',label:'Sub Category',props:{required:true}},
    {key:'sku',label:'Product ID',props:{}},
    {key:'brand',label:'Brand',props:{}},
    {key:'color',label:'Color',props:{}},
    {key:'description',label:'Description',props:{}},
    {key:'status',label:'Status',type:'select',props:{
      menuItems:[{key:'avaliable',value:'avaliable'},{key:'out of stock',value:'out of stock'},{key:'booked',value:'booked'},{key:'sold',value:'sold'}]
      }  
    },
    {key:'manuDate',label:'Manufactured Date', type:'date',props:{}},
    {key:'expiryDate',label:'Expiry Date', type:'date',props:{}},
    {key:'quantity',label:'Quantity',type:'number',props:{}},
    {key:'unitOfMeasurement',label:'Unit of Measurement ',props:{}},
    {key:'sizeValue',label:'Size',props:{dependency:'unitOfMeasurement'}},
    {key:'discountedItem',label:'Discounted Item',type:'boolean',props:{}},
    {key:'discountType',label:'Type of Discount',type:'select',props:{
      dependency:['discountedItem'],menuItems:[{key:'percentage',value:'percentage'},{key:'amount',value:'amount'},{key:'quantity',value:'quantity'}]}},
    {key:'discountValue',label:'Discount',type:'number',props:{dependency:['discountedItem','discountType']}},
    {key:'offerDiscountType',label:'Type of Offer Discount',type:'select',props:{
        dependency:['discountedItem'],
        menuItems:[{key:'percentage',value:'percentage'},{key:'amount',value:'amount'},{key:'quantity',value:'quantity'}]
      }  
    },
    {key:'offers',label:'Offer Name',props:{dependency:['discountedItem']}},
    {key:'offerDiscount',label:'Offer Discount',type:'number',props:{dependency:['discountedItem','offerDiscountType']}},
  ]
};


class ProductForm extends Component<IProps> {
  
  render() {
    return (
      <>
        <FormBuilder
          url ={'/product'}
          formName="Product"
          className ={'add'}
          buttonTitle={'Product'}
          form={defaultForm.productForm}
        />
      </>
    );
  }
}

export default ProductForm;
