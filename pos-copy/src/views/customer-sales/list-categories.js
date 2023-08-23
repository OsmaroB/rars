import React, {useEffect, useMemo,} from "react";
import { 
    Button,
    Col
  } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { 
  GET_CATEGORY, 
  GET_SUBCATEGORY, 
  CHANGE_SUBCATEGORY_CUSTOMER_SALES,
  SET_CATEGORY_CUSTOMER_SALES,
  GET_PRICE,
  GET_CUSTOMER_SALES,
} from '../../redux/contants';
import Category from "views/category";
import './style.css'

const ListCategories = () => {

    // redux states
    const categories = useSelector(state => state.category);
    const prices = useSelector(state => state.prices);
    const subcategories = useSelector(state => state.subcategories);
    const customerSales = useSelector(state => state.customerSales);
    const dispatch = useDispatch();


    useEffect(()=>{
      if(categories == null || categories == undefined){
        dispatch({type: GET_CATEGORY});
      }
      if(subcategories == null || subcategories == undefined){
        dispatch({type: GET_SUBCATEGORY});
      }
      if(prices == null || prices == undefined){
        dispatch({type: GET_PRICE});
      }
      if(customerSales == null || customerSales == undefined){
        dispatch({type: GET_CUSTOMER_SALES})
      }
    },[dispatch]);

    const Loading = () => {
        if(categories.payload !== null && categories.payload !== undefined){

          // valid price.allItem not null
            if(prices.allItems !== null && prices.allItems !== undefined){

              let pricesActiveChannels;
              // return price.allItems array for ChannelSelected
              let priceForChannel = (prices.allItems).filter((price)=>{
                return price.channelID == customerSales.channelSelectedID 
                && price.status == 0;
              });

              let priceForSubchannel = (prices.allItems).filter((price)=>{
                return price.subchannelID == customerSales.subchannelSelectedID 
                && price.status == 0;
              });
              
              if(priceForSubchannel.length > 0){
                pricesActiveChannels = priceForSubchannel;
              }else{
                pricesActiveChannels = priceForChannel;
              }

              // if(customerSales.subchannelSelectedID )

              // filter price with buttonDetailID not null
              const priceWithButtonDetail = pricesActiveChannels.filter((price)=>{
                return price.buttonDetailID != null &&
                price.status == 0;
              })
              // return buttonCategories array on pricesForChannel
              const buttonCategoriesInPrice = priceWithButtonDetail.map((price)=>{
                return price.buttonDetail.button.buttonCategories;
              })
              const buttonCategoriesInPriceFilter = buttonCategoriesInPrice.filter((button)=>{
                return button[0].category.status == 0 &&
                button[0].status == 0;
              })
              const newListCategory = [];
              buttonCategoriesInPriceFilter.forEach((buttonCategory)=>{
                buttonCategory.forEach((category)=>{
                  newListCategory.push(category.category);
                })
              });

              function removeDuplicates(originalArray, prop) {
                  var newArray = [];
                  var lookupObject  = {};
            
                  for(var i in originalArray) {
                    lookupObject[originalArray[i][prop]] = originalArray[i];
                  }
            
                  for(i in lookupObject) {
                      newArray.push(lookupObject[i]);
                  }
                  return newArray;
              }

              var uniqueArray = removeDuplicates(newListCategory, "name");
              const categoriesListOrder = uniqueArray.sort(function(a, b) {
                let nameA = a.position;
                let nameB = b.position;
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
              const renderCategoriesWithFilters = categoriesListOrder.map((categoryFilter, index)=>{
                return(
                  <>
                      <Button 
                        key={`category-list-items-customer-sales-${index}`}
                        onClick={()=>{
                          dispatch({type: SET_CATEGORY_CUSTOMER_SALES, category:categoryFilter});
                          const newList = (subcategories.Items).filter((subcategory)=> categoryFilter.id === subcategory.categoryID);
                          let isCategory = newList.length > 0 ? false : true
                          dispatch({type: CHANGE_SUBCATEGORY_CUSTOMER_SALES, subcategories: newList, isCategory: isCategory});
                        }}
                        color="primary"
                        className="mx-2 mt-1 buttonCategories">
                          {categoryFilter.name}
                      </Button>
                  </>
                )
              })
              return renderCategoriesWithFilters;
            }
          }    
          return(<><div key={'load-item-list-categories-customer-sales'} className="loading-item" /></>);
    }



    return(<>
      <Loading />
    </>
    )

};

export default ListCategories;