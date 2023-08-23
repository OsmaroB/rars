import React, {useEffect} from "react";
import {
    Button,
    Modal,
    ModalBody,
    Card,
    CardBody,
    Row,
    Col
  } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { 
    GET_ALL_CUSTOMER_SALES, 
    CHANGE_STATUS_MODIFIER_MODAL,
    GET_SUBMODIFIER,
    SET_SUBMODIFIER_LIST_CUSTOMER_SALES,
    GET_MODIFIER_PRODUCT,
    SET_LEVEL_CUSTOMER_SALE,
    SET_MODIFIER_SELECT_ID_CUSTOMER_SALES,
    SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES,
    SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES,
    ADD_ORDER_CUSTOMER_SALES,
    ADD_MODIFIER_PRODUCT_CUSTOMER_SALES,
    ADD_PRODUCT_CUSTOMER_SALES,
    GET_PRICE,
    SET_IS_PRODUCT_MODIFIER_CLICK_CS,
} from '../../redux/contants';

const Modifiers = () => {
    
    // redux states
    const customerSales = useSelector(state => state.customerSales);
    const submodifiers = useSelector(state => state.submodifiers);
    const prices = useSelector(state => state.prices);

    const modifierProducts = useSelector(state => state.modifierProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_ALL_CUSTOMER_SALES});
        dispatch({type: GET_SUBMODIFIER});
        dispatch({type: GET_MODIFIER_PRODUCT});
        dispatch({type: GET_PRICE});
    },[dispatch])

    const ListModifierProduct = () =>{
        const listModifierProducts = (modifierProducts.allItems);
        const listModifierForProduct = listModifierProducts.filter((modifierProduct)=>{
            return modifierProduct.productID == customerSales.productSelectedID;
        })
        if(customerSales.level == 1){
            const modifierSelectedFunc = (modifierProduct) => {
               if((customerSales.order).length > 0){
                    const producto = (customerSales.order).filter((producto)=>{
                        return producto.identifier == customerSales.identifierProductSelected;
                    })
                    if(producto.length > 0){
                        const productSelected = producto[0];
                        if((productSelected.modifierProduct)[0] != null){
                            const modifierEncontred = (productSelected.modifierProduct).filter((modifier)=>{
                                return modifier.modifierID == modifierProduct.modifierID
                            })
                            if(modifierEncontred.length > 0){
                                return false
                            }
                            return true
                        }
                        return true
                    }
                    return true
                }
                return true

            };
            const filterStatus = (listModifierForProduct).filter((modifierProduct)=>{
                return modifierProduct.modifier.status == 0
            });

            // read prices
            if(prices.allItems != null && prices.allItems != ''){
                // read prices with modifierProduct and channel equal to channerlSelectedID in customerSales
                const listPrices = (prices.allItems).filter((price)=>{
                    return price.modifierProduct != null && 
                    price.channelID == customerSales.channelSelectedID 
                    && price.status == 0;
                })
                // list price with subchannel selected
                let listPriceWithSubchannel;
                if(customerSales.subchannelSelectedID != 0){
                    listPriceWithSubchannel = listPrices.filter((price)=>{
                        return price.subchannelID == customerSales.subchannelSelectedID && price.status == 0;
                    })
                }else{
                    listPriceWithSubchannel = listPrices;
                }
                // filter price for productId and modifierStatus
                const priceForProduct = listPriceWithSubchannel.filter((price)=>{
                    return price.modifierProduct.productID == customerSales.productSelectedID && 
                    price.modifierProduct.modifier.status == 0 &&
                    price.status == 0;
                });
                // create newModifierList
                const priceModifierProductList = [];
                // map listmodifierWithPrices ans push in priceModifierProductList
                priceForProduct.map((price)=>{
                    priceModifierProductList.push({
                        ...price.modifierProduct, 
                        price:price.price,
                        priceID:price.id
                    });
                })
                // map filterStatos and filter priceModifierProductList with not exist push in priceModifierProductList
                const priceModifierProductFilterStatusModifier = priceModifierProductList.filter((priceMPL)=>{
                    return priceMPL?.modifier?.status == 0;
                })
                
                const listRender = priceModifierProductFilterStatusModifier.map((modifierProduct, index)=>{
                    const ButtonPrevious = () => {
                        if(index ==0){
                            return(
                                <>
                                    <Col sm={12} md={12} lg={12}>
                                        <Button
                                            color='warning'
                                            outline
                                            onClick={()=>{
                                                if(!customerSales.isProductModifierClick){
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
                                                        price: customerSales.priceSelected,
                                                        orderSelected: customerSales.orderSelected,
                                                        typeAdd:'notModifier'
                                                    });
                                                }
                                                dispatch({type: CHANGE_STATUS_MODIFIER_MODAL, status:false});
                                                dispatch({type: SET_LEVEL_CUSTOMER_SALE, level:0});
                                                dispatch({type: SET_MODIFIER_SELECT_ID_CUSTOMER_SALES, modifierID:null});
                                                dispatch({type: SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES, submodifierID:null});
                                                dispatch({type: SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES, depmodifierID:null});
                                                dispatch({
                                                    type:SET_IS_PRODUCT_MODIFIER_CLICK_CS,
                                                    status:false
                                                });
                                            }}
                                        >
                                        Finalizar</Button>
                                    </Col>
                                </>
                            )
                        }
                        return (<></>);
                    }
                    return(
                        <>
                            <ButtonPrevious />
                            <Col sm={12} md={4} lg={4}>
                                <Button
                                    outline={modifierSelectedFunc(modifierProduct)}
                                    color='primary'
                                    className="btn-modifier m-1"
                                    onClick={()=>{
                                        dispatch({
                                            type:SET_IS_PRODUCT_MODIFIER_CLICK_CS,
                                            status:true
                                        });
                                        if(modifierProduct.submodifierID != null){
                                            dispatch({type: SET_LEVEL_CUSTOMER_SALE, level:2});
                                            dispatch({type: SET_MODIFIER_SELECT_ID_CUSTOMER_SALES, modifierID:modifierProduct.modifier.id});
                                            dispatch({type: SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES, submodifierID:null});
                                            dispatch({type: SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES, depmodifierID:null});
                                        }else{
                                            if(customerSales.order.length > 0){
                                                if(customerSales.identifierProductSelected == ''){
                                                    // hay un error que corregir
                                                    dispatch({
                                                        type:ADD_PRODUCT_CUSTOMER_SALES, 
                                                        channel:{
                                                            id:customerSales.channelSelectedID,
                                                            name:customerSales.channelSelectedName
                                                        },
                                                        subchannel:{
                                                            id:customerSales.subchannelSelectedID,
                                                            name:customerSales.subchannelSelectedName
                                                        },
                                                        order:customerSales.order, 
                                                        modifierProduct:modifierProduct,
                                                        price:customerSales.priceSelected,
                                                        orderSelected: customerSales.orderSelected
                                                    })
                                                }else{
                                                    dispatch({
                                                        type: ADD_MODIFIER_PRODUCT_CUSTOMER_SALES,
                                                        order: customerSales.order,
                                                        channel:{
                                                            id:customerSales.channelSelectedID,
                                                            name:customerSales.channelSelectedName,
                                                        },
                                                        subchannel:{
                                                            id:customerSales.subchannelSelectedID,
                                                            name:customerSales.subchannelSelectedName,
                                                        },
                                                        modifierProduct: modifierProduct,
                                                        identifierProductSelected: customerSales.identifierProductSelected,
                                                        price: customerSales.priceSelected,
                                                        orderSelected: customerSales.orderSelected
                                                    })
                                                }
                                            }
                                            else{
                                                // console.log('agregando orden')
                                                dispatch({
                                                    type: ADD_ORDER_CUSTOMER_SALES, 
                                                    price: customerSales.priceSelected, 
                                                    channel:{
                                                        id:customerSales.channelSelectedID,
                                                        name:customerSales.channelSelectedName,
                                                    },
                                                    subchannel:{
                                                        id:customerSales.subchannelSelectedID,
                                                        name:customerSales.subchannelSelectedName
                                                    },
                                                    modifierProduct:modifierProduct, 
                                                    orders: customerSales.orders,
                                                    orderSelected:customerSales.orderSelected
                                                });
                                            }
                                        }
                                    }}
                                >
                                    <p className="text-modifier">{modifierProduct.modifier.name} - ${modifierProduct.price}</p>    
                                </Button>
                            </Col>
                        </>
                    );
                });
                return listRender
            }
            return (<></>);
        }
        if(customerSales.level == 2){
            const listFilter = listModifierForProduct.filter((modifierProduct)=>{
                return modifierProduct.submodifierID != null && modifierProduct.modifierID == customerSales.modifierSelectedID
            });
            const listRender = listFilter.map((modifierProduct, index)=>{
                const ButtonPrevious = () => {
                    if(index ==0){
                        return(
                            <>
                                <Row className="my-2">
                                    <Col sm={12} md={5} lg={5}>
                                        <Button
                                            color='success'
                                            outline
                                            onClick={()=>{
                                                dispatch({type: SET_LEVEL_CUSTOMER_SALE, level:1});
                                                dispatch({type: SET_MODIFIER_SELECT_ID_CUSTOMER_SALES, modifierID:modifierProduct.modifier.id});
                                                dispatch({type: SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES, submodifierID:null});
                                                dispatch({type: SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES, depmodifierID:null});
                                            }}
                                        >
                                        
                                        Anterior</Button>
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <Button
                                            color='warning'
                                            outline
                                            onClick={()=>{
                                                dispatch({type: SET_LEVEL_CUSTOMER_SALE, level:0});
                                                dispatch({type: CHANGE_STATUS_MODIFIER_MODAL, status:false});
                                                dispatch({type: SET_MODIFIER_SELECT_ID_CUSTOMER_SALES, modifierID:null});
                                                dispatch({type: SET_SUBMODIFIER_SELECT_ID_CUSTOMER_SALES, submodifierID:null});
                                                dispatch({type: SET_DEPMODIFIER_SELECT_ID_CUSTOMER_SALES, depmodifierID:null});
                                            }}
                                        >
                                        
                                        Cancelar</Button>
                                    </Col>
                                </Row>
                            </>
                        )
                    }
                    return (<></>);
                }
                return(
                    <>
                        <ButtonPrevious />
                        <Col sm={12} md={6} lg={6}>
                            <Card className="my-1"
                                onClick={()=>{
                                    // dispatch({type: SET_LEVEL_CUSTOMER_SALE, level:2});
                                }}
                            >
                                <CardBody>
                                <p>{modifierProduct.submodifier.name} - $0.00</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </>
                )
            });
            return listRender;
        }
        return(<></>);
    };

    function List(){
        if(customerSales.modifier != ''){
            if(customerSales.submodifierListSelected != ''){
                const list = (customerSales.submodifierListSelected).map((submodifier)=>{
                    return(
                        <>
                            <Col sm={12} md={6} lg={6}>
                                <Card className="my-1">
                                    <CardBody>
                                        <h6>{submodifier.name}</h6>
                                    </CardBody>
                                </Card>
                            </Col>
                        </>
                    )
                });
                return list;
            }
            // case no submodifierSelectedList
            const newList = (customerSales.modifier).filter((modifier)=>{
                return modifier.modifier.status == 0;
            });
            
            if(newList.length>0){
                const list = (newList).map((modifier)=>{
                    return(
                        <>
                            <Col sm={12} md={6} lg={6}>
                                <Card className="my-1"
                                    onClick={()=>{
                                        const list = (submodifiers.allItems).filter((submodifier)=>{
                                            return submodifier.modifierID == modifier.modifier.id;
                                        });
                                        dispatch({
                                            type: SET_SUBMODIFIER_LIST_CUSTOMER_SALES, submodifiers:list
                                        });
                                    }}
                                >
                                    <CardBody>
                                    <p>{modifier.modifier.name}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </>
                    )
                })
                return list;
            }
            return (
                <>
                    <Card className="my-2"
                        onClick={()=>{
                            dispatch({type: CHANGE_STATUS_MODIFIER_MODAL, status: false});
                        }}
                    >
                        <CardBody>
                            <h2>
                                Clic para finalizar pedido
                            </h2>
                        </CardBody>
                    </Card>
                </>
            );
        }
        return (<></>);
    }
    
    return(
        <Modal
            isOpen={customerSales.modifierModal}
            toggle={() => {
                dispatch({type: CHANGE_STATUS_MODIFIER_MODAL, status: !customerSales.modifierModal})
            }}
        >
            <ModalBody>
                <h3><b>Agregados</b></h3>
                <Row>
                    <ListModifierProduct />
                </Row>
            </ModalBody>
        </Modal>
    );
};

export default Modifiers;