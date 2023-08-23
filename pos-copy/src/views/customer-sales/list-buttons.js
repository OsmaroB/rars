import React, { useEffect } from 'react';
import { Row, Button, Col } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getModifierProducts } from 'apis/modifier-products';
import moment from 'moment';
import {
  GET_PRICE,
  CUSTOMER_SALES_GET_CHANNEL,
  CHANGE_STATUS_MODIFIER_MODAL,
  GET_MODIFIER_PRODUCT_FOR_ID,
  GET_ALL_CUSTOMER_SALES,
  SET_PRODUCT_CUSTOMER_SALE,
  SET_LEVEL_CUSTOMER_SALE,
  SET_PRICE_SELECTED_CUSTOMER_SALES,
  ADD_PRODUCT_CUSTOMER_SALES,
  SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES,
  SET_SEARCH_CUSTOMER_SALES,
} from '../../redux/contants';
import globalFunctions from 'helpers/globalFunctions';

const ListButtons = () => {
  const prices = useSelector((state) => state.prices);
  const customerSales = useSelector((state) => state.customerSales);
  const dispatch = useDispatch();

  const modifierForProduct = async (price) => {
    const modifierProducts = await getModifierProducts();
    const modifierProductForProduct = modifierProducts.data.filter(
      (modifierProduct) => {
        return modifierProduct.product.id == price.buttonDetail.product.id;
      }
    );
    return modifierProductForProduct.length;
  };

  useEffect(() => {
    dispatch({ type: GET_PRICE });
    dispatch({ type: CUSTOMER_SALES_GET_CHANNEL });
    dispatch({ type: GET_ALL_CUSTOMER_SALES });
  }, [dispatch]);

  function Loading() {
    if (!customerSales.isCategory) return <></>;
    if (prices.allItems != null && prices.allItems != '') {
      if (prices.allItems.length > 0) {
        // list channelID exist but not subchannelID
        const listPrices = prices.allItems.filter((price) => {
          return price.channelID != null && 
          price.subchannelID === null &&
          price.status == 0;
        });
        // filter for channel
        const listForChannel = listPrices.filter((price) => {
          return price.channelID == customerSales.channelSelectedID;
        });

        const pricesSubchannel = prices.allItems.filter((item) => {
          return item.subchannelID == customerSales.subchannelSelectedID;
        });
        // filter for subchannel
        const pricesForSubchannel = pricesSubchannel.filter((price) => {
          if (price.buttonDetailID != null) {
            const largecategories = price.buttonDetail.button.buttonCategories.length;
            for (let index = 0; index < largecategories; index++) {
              if(price.buttonDetail.button.buttonCategories[index].categoryID == customerSales.categorySelectedID){
                return price
              }
            }
          }
        });

        const pricesList = pricesForSubchannel.length > 0 ? pricesForSubchannel : listForChannel;
        // filter for Category Selected
        const listForCategory = pricesList.filter((price) => {
          if (price.buttonDetailID != null) {
            const largecategories = price.buttonDetail.button.buttonCategories.length;
            for (let index = 0; index < largecategories; index++) {
              if(
                price.buttonDetail.button.buttonCategories[index].category.id ==
                customerSales.categorySelectedID && 
                price.buttonDetail.button.buttonCategories[index].status == 0 &&
                price.status == 0
              ){
                return price
              }
            }
          }
          return '';
        });

        // ordenar lista por position
        const dataFilter = listForCategory.filter((price)=>{
          return (price?.buttonDetail?.product?.name?.toLowerCase()).indexOf(customerSales.filter) !== -1;
        })


        const orderListItem = dataFilter.sort(function(a, b) {
          let itemA = a.buttonDetail?.button?.position;
          let itemB = b.buttonDetail?.button?.position;
          if (itemA < itemB) {
            return -1;
          }
          if (itemA > itemB) {
            return 1;
          }
          return 0;
        });   

        const orderListForFilter = orderListItem.sort(function(a,b){
          let itemA='';
          let itemB='';
          if(customerSales.orderData.id == 1){
            itemA = a?.price;
            itemB = b?.price;
            if (itemA < itemB) {
              return 1;
            }
            if (itemA > itemB) {
              return -1;
            }
          }
          if(customerSales.orderData.id == 2){
            itemA = a?.price;
            itemB = b?.price;
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
          }
          if(customerSales.orderData.id == 3){
            itemA = a.buttonDetail?.product?.name;
            itemB = b.buttonDetail?.product?.name;
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
          }
        })

        const listRender = orderListForFilter.map((item) => {
          const date = moment();
          const currentDate = date.format('YYYY-MM-D');
          const Xmas95 = new Date(currentDate);
          const weekday = Xmas95.getDay();
          const largecategories = item.buttonDetail.button.buttonCategories.length;
          for (let index = 0; index < largecategories; index++) {
            if (
              (item.buttonDetail.button.buttonCategories[index].specificDate !==
                null &&
                item.buttonDetail.button.buttonCategories[0].specificDate ==
                  currentDate) ||
              (item.buttonDetail.button.buttonCategories[index].untilDate !== null &&
                currentDate <=
                  item.buttonDetail.button.buttonCategories[index].untilDate)
              || 
              (item.buttonDetail.button.buttonCategories[index].days!==null && 
              item.buttonDetail.button.buttonCategories[index].days.includes(weekday))
              ||
              (item.buttonDetail.button.buttonCategories[index].days===null
              && item.buttonDetail.button.buttonCategories[index].untilDate===null
              && item.buttonDetail.button.buttonCategories[index].specificDate===null    
              )
            ) 
            {
              return (
                <>
                  <Col sm={12} md={2} lg={2}>
                    <Button
                      outline
                      className="my-2 mx-2 btn-item "
                      color="primary"
                      onClick={async () => {
                        const modifierProductLength = await modifierForProduct(
                          item
                        );
                        if (modifierProductLength == 0) {
                          dispatch({
                            type: ADD_PRODUCT_CUSTOMER_SALES,
                            order: customerSales.order,
                            channel:{
                              id:customerSales.channelSelectedID,
                              name:customerSales.channelSelectedName
                            },
                            subchannel:{
                                id:customerSales.subchannelSelectedID,
                                name:customerSales.subchannelSelectedName
                            },
                            modifierProduct: null,
                            price: item,
                            orderSelected: customerSales.orderSelected,
                          });
                        } else {
                          if (item.buttonDetailID != null) {
                            dispatch({
                              type: SET_PRICE_SELECTED_CUSTOMER_SALES,
                              price: item,
                            });
                            dispatch({
                              type: SET_PRODUCT_CUSTOMER_SALE,
                              product: item.buttonDetail.product,
                            });
                            dispatch({ type: SET_LEVEL_CUSTOMER_SALE, level: 1 });
                          }
                          dispatch({
                            type: CHANGE_STATUS_MODIFIER_MODAL,
                            status: true,
                          });
                          dispatch({
                            type: GET_MODIFIER_PRODUCT_FOR_ID,
                            modifier: item,
                            step: 1,
                          });
                          dispatch({
                            type: SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES,
                            identifier: '',
                          });
                        }
                      }}
                    >
                      <p className='btn-item-text'>{item.buttonDetail.button.name}</p>
                      <span className='btn-item-price'>${parseFloat(item.price).toFixed(2)}</span> 
                    </Button>
                  </Col>
                </>
              );
            }
          }
        });
        return listRender;
      }
    }
    return <div className="loading-item" />;
  }

  return (<>
      <Loading />
  </>)
};

export default ListButtons;
