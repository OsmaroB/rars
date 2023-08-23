/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Row,
  Container,
  Button,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import successMessage, { errorMessage, warningMessage } from 'helpers/messages';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Colxx } from 'components/common/CustomBootstrap';
import voids from 'helpers/updateOrders';
import { checkCode } from 'apis/user';
import {
  GET_ALL_CUSTOMER_SALES,
  GET_PRICE,
  SET_CLIENT_MODAL_CUSTOMER_SALES,
  SET_DOCUMENT_MODAL_CUSTOMER_SALES,
  GET_DOCUMENT,
  READ_CASH_DESK_CLOSING_FOR_DATE_DESK_STATU_CS,
  GET_TIKET_CONFIGURATION,
  SET_ORDER_CUSTOMER_SALES,
  SET_ORDER_MODAL_CUSTOMER_SALES,
  SET_DISCOUNT_MODAL_CUSTOMER_SALES,
  GET_DISCOUNT,
  SET_ORDER_SELECTED_CUSTOMER_SALES,
  SET_DESCRIPTION_CUSTOMER_SALES,
  SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES,
} from '../../redux/contants';
import Item from './item';
import ListChannels from './list-channels';


const ListItems = () => {
  
  const dispatch = useDispatch();
  const customerSales = useSelector((state) => state.customerSales);
  const prices = useSelector((state) => state.prices);
  const tiketConfigurations = useSelector((state) => state.tiketConfigurations);
  const discounts = useSelector((state) => state.discounts);
  const [dropDownState, setDropDownState] = useState(false);
  const [discountSubchannel, setDiscountSubchannel] = useState(0.00);

  
  useEffect(() => {
    dispatch({ type: GET_ALL_CUSTOMER_SALES });
    dispatch({ type: GET_PRICE });
    dispatch({ type: GET_TIKET_CONFIGURATION });
  }, [dispatch]);
  
  const cancelSale = async () => {
    Swal.fire({
      title: '¿Estás seguro de cancelar esta compra?',
      text: 'Se eliminara todo el proceso realizado previamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cancelarla',
    }).then((result) => {
      if (result.isConfirmed) {
        const orderSelected = customerSales.orderSelected;
        voids.updateOrders(orderSelected,[]);
        voids.deleteOrders(orderSelected);
        dispatch({type: SET_ORDER_SELECTED_CUSTOMER_SALES, orderSelected:0})
        dispatch({
          type: SET_ORDER_CUSTOMER_SALES,
          order: [],
          total: 0.0,
          discounts:0.00,
        });
        successMessage('Compra cancelada correctamente', 'Exito');
      }
    });
  };
  const getCutx = () => {
    const date = moment(new Date()).format('YYYY-MM-DD');
    const newDate = date;
    const tiketDetail = tiketConfigurations.Items[0];
    const cashRegister = tiketDetail.cashRegisterNumber;
    const cashdeskclosing = {
      date: newDate,
      cashRegister,
      status: 0,
    };
    dispatch({
      type: READ_CASH_DESK_CLOSING_FOR_DATE_DESK_STATU_CS,
      cashdeskclosing,
    });
  };

  const prueba = useMemo(() => {
    let { order } = customerSales;
    
    const channelID = customerSales.channelSelectedID;
    const subchannelID = customerSales.subchannelSelectedID;
    const actualPrice = prices.allItems;
    const newOrder = [];
    // recolect price for channel
    const priceForChannelSelected = actualPrice.filter((product) => {
      return (
        product.channelID == channelID &&
        product.subchannelID == null &&
        product.buttonDetail != null
      );
    });
    // recolect price for subchannel
    const priceForSubchannelSelected = actualPrice.filter((product) => {
      return (
        product.subchannelID == subchannelID && product.buttonDetail != null
      );
    });

    // recolect product filter for  order exist for channel
    
    priceForChannelSelected.map((product) => {
      const intento = order.filter((productFilter) => {
        return productFilter.productID == product.buttonDetail.product.id 
        && product.status == 0;
      });
      intento.map((item) => {
        const newData = {
          ...item,
          cost: product.price,
        };
        newOrder.push(newData);
      });
    });
    priceForSubchannelSelected.map((product) => {
      const intento = order.filter((productFilter) => {
        return productFilter.productID == product.buttonDetail.product.id && productFilter?.priceArray?.status == 0 && product?.status == 0;
      });
      intento.map((item) => {
        const newData = {
          ...item,
          cost: product.price,
        };
        newOrder.push(newData);
      });
    });
    let total = 0.0;
    let discounts = 0.0;
    total = (voids.total(newOrder)).total;
    discounts = (voids.total(newOrder)).discounts;
    
    if(actualPrice.length > 0){
      const channel = {
        id:customerSales.channelSelectedID,
        name:customerSales.channelSelectedName
      }
      const subchannel = {
        id:customerSales.subchannelSelectedID,
        name:customerSales.subchannelSelectedName
      }
      voids.updateOrders(customerSales.orderSelected, newOrder,channel,subchannel);
    }
    dispatch({ type: SET_ORDER_CUSTOMER_SALES, order: newOrder, total, discounts });
  }, [
    customerSales.statusChangueOrder,
    // customerSales.order,
    customerSales.channelSelectedID,
    customerSales.subchannelSelectedID,
  ]);

  const ListMemo = useMemo(() => {
    const { order } = customerSales;
    // console.log(order);
    if (order.length == 0) {
      // si no existe localstorage se crea
      if (localStorage.getItem('orders') == undefined) {
        const orderInicial = [];
        const orderChannelInicial = [];
        localStorage.setItem('orders', JSON.stringify(orderInicial));
        localStorage.setItem('ordersChannel',JSON.stringify(orderChannelInicial));
      } else {
        const orderActual = JSON.parse(localStorage.getItem('orders'));
        if (orderActual[customerSales.orderSelected] != '') {
          if (orderActual.length > 0) {
            let total = 0.0;
            let discounts = 0.0;
            total = (voids.total(orderActual[customerSales.orderSelected])).total;
            discounts = (voids.total(orderActual[customerSales.orderSelected])).discounts;
            if (orderActual.length > 0) {
              dispatch({
                type: SET_ORDER_CUSTOMER_SALES,
                order: orderActual[customerSales.orderSelected],
                total,
                discounts
              });
            }
          }
        }
      }
    }
    const listReturn = order.map((product, index) => {
      return (
        <>
          {prueba}
          <Item
            key={`list-item-customer-sales-${index}`}
            product={product}
            indexProduct={index}
            identifier={product.identifier}
            prices={prices}
            orderSelected={customerSales.orderSelected}
          />
        </>
      );
    });
    return listReturn;
  }, [customerSales]);

  const globalDiscount = useMemo(() => {
    if(discounts.currentCoupon.id !== 0) {
      return (
        <>
          <h6>Cupón de descuento</h6>
          <h6>
            {discounts.currentCoupon.name}{' '}
            {discounts.currentCoupon.type === 0 ? '$ ' : ''}
            {discounts.currentCoupon.discountInfo}
            {discounts.currentCoupon.type === 1 ? ' %' : ''}
          </h6>
        </>
      );
    }
    return <></>
  }, [discounts.currentCoupon]);
  
  const channelDiscount = useMemo(() => {
    let found = false;
    let name = '';
    let type = 0;
    let discountInfo = 0;

    if (discounts.currentCoupon.id === 0) {
      discounts.allItems.map((dis) => {
        if (
          dis.channelID == customerSales.channelSelectedID ||
          dis.subchannelID == customerSales.subchannelSelectedID
        ) {
          name = dis.name;
          discountInfo = dis.discountInfo;
          type = dis.type;
          found = true;
        }
      });
      if (found == true){
        return (
          <h6>
            {name} {type === 0 ? '$ ' : ''}
            {discountInfo}
            {type === 1 ? ' %' : ''}
          </h6>
        );
      }
    }
  }, [customerSales.channelSelectedID, customerSales.subchannelSelectedID]);

  const FinishSale = () =>{
    if(!customerSales.documentModal){
      return(
        <Row className='mt-2'
          style={{'backgroundColor':'#212220'}}
        >
          <Button
            className="btn btn-block"
            color="primary"
            style={{ borderRadius: '10px' }}
            onClick={() => {
              dispatch({
                type:SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES,
                discountSubchannel:discountSubchannel
              })
              if (customerSales.order.length > 0) {
                getCutx();
                dispatch({
                  type: SET_DOCUMENT_MODAL_CUSTOMER_SALES,
                  status: !customerSales.documentModal,
                });
              } else {
                warningMessage(
                  '',
                  'Debe de existir al menos un producto en la orden'
                );
              }
            }}
          >
            Finalizar Compra
          </Button>
            <Button
              className="btn btn-block mt-3 mb-5"
              color="secondary"
              style={{ borderRadius: '10px' }}
              onClick={() => cancelSale()}
            >
              Cancelar compra
            </Button>
        </Row>
      )
    }
    return(<></>);
  }

  // IMPORTANTE SABER QUE EL DISCOUNT CHANNEL POR EL MOMENTO ESTA ASÍ PORQUE SOLO 
  // SE NECESITABA EL CHANNNEL
  const DiscountChannel = () => {
    if(discounts.currentCoupon.id === 0){
      let discountPercentRender = <></>;
      let discountPercent = 0;
      discounts.allItems.map((dis, index) => {
        if (dis.channelID == customerSales.channelSelectedID) {
          if (dis.type === 0) {
            return <h5 key={`discount-1-${index}`}>$ {customerSales.total - dis.discountInfo}</h5>;
          }
          return (
            <h5>
              ${parseFloat(customerSales.total - customerSales.total * dis.discountInfo).toFixed(2)}
            </h5>
          );
        }
        // if duscount cahnnel equal to subchannelSelectedID
        if (dis.subchannelID == customerSales.subchannelSelectedID) {
          // discount type money specific
          if (dis.type === 0) {
            return (
              <h5 key={`discount-2-${index}`}>$ {parseFloat(customerSales.total - dis.discountInfo).toFixed(2)}</h5>
            );
          }
          discountPercent = parseFloat(customerSales.total - (customerSales.total * (dis.discountInfo/100))).toFixed(2);
          discountPercentRender = (<h5 className="text-right" key={`discount-3-${index}`}>
              ${
                parseFloat(customerSales.total - (customerSales.total * (dis.discountInfo/100))).toFixed(2)
              }
            </h5>
          )
          return
        }
      })
      setDiscountSubchannel(discountPercent);
      return discountPercentRender;
    }else if(discounts.currentCoupon.isGlobal !== 1){
        if(discounts.currentCoupon.type === 1){
          return(<>
          <h1>
            {
              `$ ${parseFloat(customerSales.total - customerSales.total * discounts.currentCoupon.discountInfo).toFixed(2)
              }`
            }
          </h1>
          </>)
        }else{
          return(<>
            <h6>
              {
                `$ ${
                  parseFloat(customerSales.total - discounts.currentCoupon.discountInfo).toFixed(2)
                }`
              }
            </h6>
          </>)
        }
    }
    setDiscountSubchannel(parseFloat(0).toFixed(2))
    return <></>;
  };

  const subtotalData = useMemo(() => {
    return (
      <Row style={{'backgroundColor':'#212220'}}
      >
        <Col sm="8">
          <h5 className="text-left">Subtotal</h5>
        </Col>
        <Col sm="4">
          <h5 className="text-right">${parseFloat(customerSales.total).toFixed(2)}</h5>
        </Col>
        {/* <Col sm="8">
          <h5 className="text-left">Descuentos</h5>
        </Col>
        <Col sm="4">
          <h5 className="text-right">${customerSales.discounts}</h5>
        </Col> */}

        <Col sm="8">
          <h5 className="text-left">Total</h5>
        </Col>
        <Col sm="4">
          <h5 className="text-right">${parseFloat(customerSales.total-customerSales.discounts).toFixed(2)}</h5>
        </Col>
        <Col sm="8">
          {channelDiscount}
        </Col>
        {/* <Col sm="4">
          {globalDiscount}
        </Col> */}
        <Col sm="4">
          <DiscountChannel />
        </Col>
      </Row>
    );
  }, [
    customerSales.channelSelectedID,
    customerSales.subchannelSelectedID,
    customerSales.order,
    customerSales,
    discounts.currentCoupon,
  ]);
  return (
    <>
      <div className={`${customerSales.documentModal ? '': 'stiky-topnavbar-2'}`}
          style={customerSales.documentModal ? {'backgroundColor':'#212220'}: {}}

      >
        <Row hidden={customerSales.documentModal}
          
        >
          <Col sm={12} className='mb-2'>
            {/* SALES CHANNELS */}
            <ListChannels hidden={customerSales.documentModal} />
            {/* FIN DE SALES CHANNELS */}
          </Col>
        </Row>
          <Row
            style={{
              backgroundColor: '#212220',
              borderRadius:'20px'
            }}
          >
            <Col sm={12} className='mt-3'>
              <Input
                type="text" 
                className="rounded"
                placeholder="Descripción opcional en ticket"
                value={customerSales.description}
                onChange={(e) => {
                  dispatch({type:SET_DESCRIPTION_CUSTOMER_SALES, description:e.target.value})
                }}
              />
            </Col>
            <Col sm={12} className='global-list-item-overflow'>
              <hr />
              {/* ITEM DE PRODUCTOS */}
              {ListMemo}
            </Col>
            <Col sm={12} className='mt-2'>
              <Container>
                {subtotalData}
              </Container>
            </Col>
          </Row>
        <Container className="mt-3 mb-5">
          <FinishSale />
        </Container>
      </div>
    </>
  );
};

export default ListItems;
