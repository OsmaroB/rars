import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Input, Button, Badge } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getModifierProducts } from 'apis/modifier-products';
import './style.css'
import {
  ADD_MODIFIER_PRODUCT_CUSTOMER_SALES,
  CHANGE_STATUS_MODIFIER_MODAL,
  DELETE_PRODUCT_CUSTOMER_SALES,
  GET_ALL_CUSTOMER_SALES,
  GET_MODIFIER_PRODUCT_FOR_ID,
  SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES,
  SET_LEVEL_CUSTOMER_SALE,
  SET_PRICE_SELECTED_CUSTOMER_SALES,
  SET_PRODUCT_CUSTOMER_SALE,
  UPDATE_PRODUCT_CUSTOMER_SALES,
} from '../../redux/contants';

const Item = (props) => {
  const { product, indexProduct, identifier, prices } = props;
  const dispatch = useDispatch();
  const customerSales = useSelector((state) => state.customerSales);

  useEffect(() => {
    dispatch({ type: GET_ALL_CUSTOMER_SALES });
  }, [dispatch]);

  const modifierForProduct = async (productID) => {
    const modifierProducts = await getModifierProducts();
    const modifierProductForProduct = modifierProducts.data.filter(
      (modifierProduct) => {
        return modifierProduct.product.id == productID;
      }
    );
    return modifierProductForProduct.length;
  };

  const ModifierInProducts = (props) => {
    const {type} = props;
    if (product.modifierProduct[0] != null) {
      const modifiers = product.modifierProduct.map((modifier) => {
        return modifier;
      });
      // filter depModifierID
      const depmodifierFilter = modifiers.filter((modifier) => {
        return modifier.depmodifierID != null;
      });
      // filter depModifierID
      const submodifierFilter = modifiers.filter((modifier) => {
        return modifier.submodifierID != null && modifier.depmodifierID == null;
      });
      // filter depModifierID
      const modifierFilter = modifiers.filter((modifier) => {
        return (
          modifier.modifierID != null &&
          modifier.submodifierID == null &&
          modifier.depmodifierID == null
        );
      });
      // show modifierID
      const modifiersList = modifierFilter.map((modifier, index) => {
        if(type == '0'){
          return (
            <>
              <b
                className='cantPriceXSS'
                key={`b-index-item-name-${index}`} 
                style={{'fontSize':'8px'}}
              >
                <Row>
                  <Col sm={12}>
                    {modifier.modifier.name}
                  </Col>
                </Row>
              </b>
              <br />
            </>
          );
        }
        if(type == '1'){
          return (
            <>
              <br />
              <b 
                key={`b-index-item-price-${index}`} 
                style={{'fontSize':'8px'}}>
                <Row>
                  <Col sm={7}>
                    <span className='priceXSS'>
                      ${parseFloat(modifier.price).toFixed(2)}
                    </span>
                  </Col>
                  <Col sm={5} hidden={customerSales.documentModal}>
                    <Button
                      color="primary"
                      // hidden={product.modifierProduct[0]?.id == null}
                      outline
                      size='xs'
                      className="btnXSS"
                      style={{ borderRadius: '30px', fontSize: '8px' }}
                      onClick={() => {
                        dispatch({
                          type: ADD_MODIFIER_PRODUCT_CUSTOMER_SALES,
                          order: customerSales.order,
                          modifierProduct: modifier,
                          identifierProductSelected: product.identifier,
                          price: product.priceArray,
                          orderSelected: customerSales.orderSelected,
                          deleteModifier:true
                      })
                      }}
                    >
                      <i className="simple-icon-trash btn-group-icon" />
                    </Button>
                  </Col>
                </Row>
              </b>
            </>
          );
        }
        if(type == '2'){
          return (
            <>
              <br />
              <b 
                className='cantPriceXSS'
                key={`b-index-item-price-${index}`} 
                style={{'fontSize':'8px'}}
              >
                <Row>
                  <Col sm={12}>
                    {modifier.cantModifier}
                  </Col>
                </Row>
              </b>
            </>
          );
        }
      });
      return modifiersList;
      // return(<></>);
    }
    return <></>;
  };

  const ItemMemo = useMemo(() => {
    return (
      <Row className='list-item-overflow'>
        <Col sm={customerSales.documentModal ? '8' : '5'}>
          <Col sm={12} md={12} lg={12} className="">
              <p className='text-left' style={{'lineHeight':'12px'}}>
                <Row>
                  <Col sm={12} className='mb-2'>
                    <span style={{'fontSize':'13px'}} className="text-cart-shop">
                      {product.name}
                    </span>
                    <Badge 
                      hidden={product.priceArray.discount == null} 
                      color="primary" 
                      // pill 
                      className="pill-discount">
                      <i className="simple-icon-tag" style={{'fontSize':'10px'}} />
                    </Badge>{' '}
                    {/* <b style={{'fontSize':'11px'}}>{product.modifierProduct[0] == null ? '' : 'Agregados'}</b> */}
                    <br hidden={product.modifierProduct[0] == null} />
                  </Col>
                  <Col sm={12}>
                    <ModifierInProducts type='0'/>
                  </Col>
                </Row>
              </p>
          </Col>
        </Col>
        <Col sm="1">
          <p  className='text-left' style={{'lineHeight':'12px'}} >
            <Row>
              <Col sm={12} className=''>
                {product.cant}
              </Col>
              <Col sm={12}>
                <ModifierInProducts type='2'/>
              </Col>
            </Row>
          </p>
        </Col>
        <Col sm="2" className='text-cart-shop'>
          <p style={{'lineHeight':'12px'}}>
            <Row>
              <Col sm={12}>
                ${parseFloat(product.cost * product.cant).toFixed(2)}    
              </Col>
              <Col sm={12}>
                <ModifierInProducts type='1'/>
              </Col>
            </Row>
          </p>
          {/* {product.priceArray.discount === null ? (
            ''
          ) : product.priceArray.discount.type === 1 ? (
            <span>
              -${parseFloat(product.priceArray.discount.discountInfo * product.cost * product.cant).toFixed(2)}
            </span>  
          ) : (
            <span>
              -${parseFloat(product.priceArray.discount.discountInfo * product.cant).toFixed(2)}
            </span>
          )} */}
        </Col>
        <Col sm={customerSales.documentModal? '' : '3'} hidden={customerSales.documentModal}>
          <Row className='mb-2'>
            <Col sm={12} md={6} lg={6}>
              <Button
                hidden={product.modifierProduct[0]?.id == null}
                color="primary"
                size='xs'
                outline
                className="btnXS"
                style={{ borderRadius: '10px', fontSize: '15px' }}
                onClick={async () => {
                  const modifierProductLength = await modifierForProduct(
                    product.id
                  );
                  if (modifierProductLength != 0) {
                    dispatch({
                      type: SET_PRICE_SELECTED_CUSTOMER_SALES,
                      price: product.priceArray,
                    });
                    dispatch({
                      type: SET_PRODUCT_CUSTOMER_SALE,
                      product,
                    });
                    dispatch({ type: SET_LEVEL_CUSTOMER_SALE, level: 1 });
                    dispatch({
                      type: CHANGE_STATUS_MODIFIER_MODAL,
                      status: true,
                    });
                    const modifierData = {
                      buttonDetail: {
                        product,
                      },
                    };
                    dispatch({
                      type: GET_MODIFIER_PRODUCT_FOR_ID,
                      modifier: modifierData,
                      step: 1,
                    });
                    dispatch({
                      type: SET_IDENTIFIER_PRODUCT_CUSTOMER_SALES,
                      identifier,
                    });
                  }
                }}
              >
                <i className="simple-icon-pencil btn-group-icon" />
              </Button>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Button
                color="primary"
                outline
                size='xs'
                className="btnXS"
                style={{ borderRadius: '10px', fontSize: '15px', padding:'10px' }}
                onClick={() => {
                  dispatch({
                    type: DELETE_PRODUCT_CUSTOMER_SALES,
                    order: customerSales.order,
                    product,
                    indexProduct,
                    orderSelected: customerSales.orderSelected,
                  });
                }}
              >
                <i className="simple-icon-trash btn-group-icon" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }, [customerSales.order,customerSales.total]);

  return <>{ItemMemo}</>;
};

export default Item;
