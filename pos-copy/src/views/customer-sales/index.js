import React, { useEffect, Suspense, useState } from 'react';
import { 
  Row, 
  Container, 
  Col,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown
} from 'reactstrap';
import Token from 'containers/token/Token';
import { useDispatch, useSelector } from 'react-redux';
import ModalCashDesk from 'views/cut-x/modalCashDesk';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  GET_CATEGORY,
  GET_SUBCATEGORY,
  CUSTOMER_SALES_GET_CHANNEL,
  GET_ALL_CUSTOMER_SALES,
  GET_PRICES_FOR_CHANNEL_AND_CATEGORY,
  SET_SEARCH_CUSTOMER_SALES,
  SET_ORDER_DATA_CUSTOMER_SALES,
} from '../../redux/contants';
import ListItems from './list-items';

const ListCategories = React.lazy(() => import('./list-categories'));
const ListButtons = React.lazy(() => import('./list-buttons'));
import ListSubcategories from './list-subcategories';
import Modifiers from './modifiers';
import CustomerModal from './customerModal';
import DocumentModal from './documentsModal';
import OrdersModal from './ordersModal';
import CustomerDiscountModal from './customerDisccount';
import { checkCutzPending } from 'apis/cash-desk-closing';
import { errorMessage, warningMessage } from 'helpers/messages';
import { useHistory } from 'react-router-dom';
import CutZValid from 'containers/token/CutZValid';
import moment from 'moment';

const CustomerSales = () => {
  const [dropDownState, setDropDownState] = useState(false);

  // redux states
  const customerSales = useSelector((state) => state.customerSales);
  const history=useHistory();
  const dispatch = useDispatch();

  // states
  useEffect(async() => {
    dispatch({ type: GET_CATEGORY });
    dispatch({ type: GET_SUBCATEGORY });
    dispatch({ type: CUSTOMER_SALES_GET_CHANNEL });
    dispatch({ type: GET_ALL_CUSTOMER_SALES });
    dispatch({
        type: GET_PRICES_FOR_CHANNEL_AND_CATEGORY, 
        channelID:2,
        categoryID:'',
    })
    var yesterday = new Date(Date.now() - 86400000);
    if(localStorage.getItem('tiket-configuration')){
      const check={
        type:1,
        date:yesterday.getFullYear()+"-"+parseInt(yesterday.getMonth()+1)+"-"+yesterday.getDate(),
        cashRegister:JSON.parse(localStorage.getItem('tiket-configuration'))[0].cashRegisterNumber,
      }
      
      const getCutPending=await checkCutzPending(check);
      // console.log(getCutPending);
      if(localStorage.getItem('roleDetail')){
        const filter = '/app/cut-z';
        const newList = (JSON.parse(localStorage.getItem('roleDetail'))).filter(function(element){
            return (element.url.toLowerCase()).indexOf(filter) !== -1 && element.status == 0;
        });
        if(newList.length>0){
          if(getCutPending.data.length==0){
            errorMessage("Debes finalizar el corte z del día anterior","Error");
            history.push("/app/cut-z")
          }
        }
      }
    }else{
      // history.push("/user/login")
    }
  }, [dispatch]);

  const ModalCashDeskView = () =>{
    if(localStorage.getItem('dateSales')){
      if(moment(localStorage.getItem('dateSales')).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && !localStorage.getItem('prettycash')){
        return <ModalCashDesk />
      }else{
        if(localStorage.getItem('prettycash')){
          return <></>
        }
        history.push("/app/cut-z")
        warningMessage('','Realiza el corte Z de la fecha ' + localStorage.getItem('dateSales'))
        return <></>

      }
    }else{
      return <ModalCashDesk />
    }
  };

  return (
    <>
    <Token />
    <CutZValid />
    <Suspense fallback={<div className="loading" key={`suspense-index-customer-sales`}/>}>
      <Container 
      fluid
      style={{'padding':'0px', 'margin':'0px'}}
      >
        <Colxx xxs={12} className="mt-4 mb-4">
          <ModalCashDeskView />
        </Colxx>
        <Row className={`mb-3 pt-2 stiky-topnavbar`} 
          style={{
            // backgroundColor: '#212220',
          }}
        >
            <Col sm={8} className='mb-3'>
              <ListCategories />
            </Col>
        </Row>
        <Row key="row1" className='after-stiky-topnavbar'>
          <Col sm="8">
            <Row>
              <Col sm={2} className='mt-2'>
                <p 
                  style={{fontSize:'15px'}}
                >Orden # {customerSales.orderSelected +1 }</p>
              </Col>
              <Col sm={6}
                className='mt-2'
              >
                <Row>
                  <Col sm={3}>
                    <h6>Buscador</h6>
                  </Col>
                  <Col sm={9}>
                    <Input
                      placeholder='Busca por nombre'
                      style={{
                        height:'25px',
                        borderRadius:'20px'
                      }}
                      onChange={(e)=>{
                        const text = e.target.value;
                        dispatch({type:SET_SEARCH_CUSTOMER_SALES, filter:text})
                      }}
                    >
                    </Input>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} className='mt-2'>
                <Row>
                  <Col sm={9}>
                    <ButtonDropdown
                      isOpen={dropDownState}
                      toggle={() => setDropDownState(!dropDownState)}
                    >
                      <div className="">
                        <DropdownToggle
                          color="primary"
                          outline
                          className="btn btn-sm mx-1"
                          style={{
                            margin: '0',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                          }}
                          caret
                        >
                          {
                            `${customerSales.orderData.id == '' ? 'Ordenar': customerSales.orderData.name}`
                          }
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            key="drp-option-1"
                            onClick={() => {
                              dispatch({
                                type: SET_ORDER_DATA_CUSTOMER_SALES,
                                orderData:{
                                  id:1,
                                  name:'Precio mayor a menor'
                                },
                              })
                            }}
                          >
                            Precio mayor a menor
                          </DropdownItem>
                          <DropdownItem
                            key="drp-option-1"
                            onClick={() => {
                              dispatch({
                                type: SET_ORDER_DATA_CUSTOMER_SALES,
                                orderData:{
                                  id:2,
                                  name:'Precio menor a mayor'
                                },
                              })
                            }}
                          >
                            Precio menor a mayor
                          </DropdownItem>
                          <DropdownItem
                            key="drp-option-2"
                            onClick={() => {
                              dispatch({
                                type: SET_ORDER_DATA_CUSTOMER_SALES,
                                orderData:{
                                  id:3,
                                  name:'Orden Alfabetico'
                                },
                              });
                            }}
                          >
                            Orden Alfabetico
                          </DropdownItem>
                          <DropdownItem
                            key="drp-option-2"
                            onClick={() => {
                              dispatch({
                                type: SET_ORDER_DATA_CUSTOMER_SALES,
                                orderData:{
                                  id:0,
                                  name:'Quitar filtro'
                                },
                              });
                            }}
                          >
                            Quitar filtro
                          </DropdownItem>
                        </DropdownMenu>
                      </div>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </Col>
              <Col sm="12" className="mt-2">
                <h3>
                  Canal de venta: {customerSales.channelSelectedName} |
                  Categoria: {customerSales.categorySelectedName}
                </h3>
              </Col>
            </Row>
            <Row className="my-1 mx-1">
              {/* <ListSubcategories /> */}
              <ListButtons />
            </Row>
          </Col>
          <Col
            sm="4"
            className="h-100"
          >
            <ListItems />
          </Col>
        </Row>
      </Container>
      <Modifiers />
      <CustomerModal />
      <CustomerDiscountModal />
      <DocumentModal />
      <OrdersModal />
    </Suspense>
    </>
  );
};

export default CustomerSales;
