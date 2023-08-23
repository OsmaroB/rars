import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    SET_ORDER_MODAL_CUSTOMER_SALES, 
    GET_ALL_CUSTOMER_SALES, 
    SET_ORDER_CUSTOMER_SALES, 
    SET_ORDER_SELECTED_CUSTOMER_SALES, 
    CUSTOMER_SALES_CHANGE_CHANNEL,
    CUSTOMER_SALES_CHANGE_SUBCHANNEL,
    SET_CATEGORY_CUSTOMER_SALES
} from "redux/contants";
import {
    Modal,
    ModalBody,
    Row,
    Col,
    Button,
    Label,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import { useMemo } from "react";
import voids from "helpers/updateOrders";
import './style.css';

const OrdersModal = () => {

    const dispatch = useDispatch();
    const customerSales = useSelector(state => state.customerSales);
    
    useEffect(()=>{
        dispatch({type: GET_ALL_CUSTOMER_SALES});
    },[dispatch])

    const ButtonOrders = useMemo(() => {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const ordersChannel = JSON.parse(localStorage.getItem('ordersChannel'))
        const ordersList = orders.map((order,index)=>{
            return(
                <Col 
                    sm={4} md={4} lg={4} 
                    className={`mt-2`}
                    key={`btn-order-${index}`
                }>
                    
                    <Row
                        style={{"padding":"0px", "margin":"0px"}}
                    >
                        <Col sm={12}>
                        <p
                            className="text-right"
                        >
                        {/* Button delete order */}
                        <Button 
                            hidden={ customerSales.orderSelected == index ? false: true}
                            outline
                            className="btn-delete-order"
                            color="primary"
                            size="xs"
                            onClick={()=>{
                                voids.deleteOrders(customerSales.orderSelected);
                                if(customerSales.orderSelected == index){
                                    dispatch({
                                        type:SET_ORDER_CUSTOMER_SALES,
                                        order: [],
                                        total: 0.0,
                                        discounts:0.00,
                                    })
                                }
                                if(index == 0){
                                    dispatch({type:SET_ORDER_SELECTED_CUSTOMER_SALES, orderSelected:0});
                                }else{
                                    dispatch({type:SET_ORDER_SELECTED_CUSTOMER_SALES, orderSelected:0});
                                }
                            }}
                        >X
                        </Button>
                        </p>
                        </Col>
                    </Row>
                    <Button 
                    outline={customerSales.orderSelected == index ? false: true}
                    className=""
                    color="primary"
                    style={{'height': '100px', 'borderRadius': '10px'}}
                    onClick={ ()=>{
                        dispatch({type:SET_ORDER_SELECTED_CUSTOMER_SALES, orderSelected:index});
                        let total = 0.00;
                        let discounts = 0.00;
                        total = (voids.total(order)).total;
                        discounts = (voids.total(order)).discounts;
                        dispatch({type:SET_ORDER_CUSTOMER_SALES, order, total, discounts});
                        if(ordersChannel[index]?.subchannel?.id != ''){
                            dispatch({
                                type: CUSTOMER_SALES_CHANGE_SUBCHANNEL, 
                                changueChannel: ordersChannel[index].subchannel, 
                                channel: ordersChannel[index].channel
                            });
                        }else{
                            dispatch({
                                type: CUSTOMER_SALES_CHANGE_CHANNEL, 
                                channel:ordersChannel[index].channel
                            })
                        }

                    }}
                    >
                        <Row>
                            <Col sm="12">
                            <h5 className="text-center">Orden {index + 1}</h5>  
                            </Col>
                        </Row>
                    </Button>
                </Col>
            )
        })
        return ordersList;
    },[customerSales])

    return(<>
    <Modal
            isOpen={customerSales.ordersModal}
            size=""
            toggle={() => {
                dispatch({type: SET_ORDER_MODAL_CUSTOMER_SALES, status: !customerSales.ordersModal})
            }}
        >
            <ModalBody>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h3>Órdenes</h3>
                    </Col>
                    <Col sm={12} md={5} lg={5} className="my-2">
                        <Button
                            color="primary"
                            size='sm'
                            onClick={()=>{
                                const orders = JSON.parse(localStorage.getItem('orders'));
                                const ordersChannel = JSON.parse(localStorage.getItem('ordersChannel'));
                                orders[orders.length] = [];
                                ordersChannel[ordersChannel.length] = {
                                    channel:{
                                        id:'2',
                                        name:'Restaurante',
                                    },
                                    subchannel:{
                                        id:'',
                                        name:'',
                                    }
                                }
                                
                                localStorage.setItem('orders', JSON.stringify(orders));
                                localStorage.setItem('ordersChannel', JSON.stringify(ordersChannel))
                                dispatch({
                                    type:SET_CATEGORY_CUSTOMER_SALES,
                                    category:{
                                        id:1,
                                        name:''
                                    }
                                })
                                dispatch({type:SET_ORDER_SELECTED_CUSTOMER_SALES, orderSelected:(orders.length-1)});
                                dispatch({
                                    type:SET_ORDER_CUSTOMER_SALES, 
                                    order:orders[orders.length-1],
                                    total:0.00,
                                    discounts:0.00
                                })                             
                            }} 
                        >Agregar nueva orden</Button>
                    </Col>
                    <Col sm={12} md={6} lg={6} className="my-2">
                        <Button
                        outline
                            color="primary"
                            size='sm'
                            onClick={()=>{
                                localStorage.setItem('orders', JSON.stringify([]));
                                localStorage.setItem('ordersChannel', JSON.stringify([]));
                                window.location.reload();
                            }}
                        >Limpiar órdenes</Button>
                    </Col>
                    {/* <ButtonOrders /> */}
                    {ButtonOrders}
                </Row>
            </ModalBody>
        </Modal>
    </>);
};

export default OrdersModal;