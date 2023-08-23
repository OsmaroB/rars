import React, {useEffect, useState, useMemo} from "react";
import './style.css'
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
import voids from 'helpers/updateOrders';
import globalValidator from "helpers/globalValidator";
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {warningMessage, swMessage} from "helpers/messages";
import validation from "containers/validations/ValidationCustomer";
import Cookies from 'universal-cookie';
import {getDocument} from 'apis/document';
import ListItems from './list-items';
import ModalCashDesk from "views/cut-x/modalCashDesk";
import {
    GET_ALL_CUSTOMER_SALES,
    GET_DOCUMENT,
    GET_DOCUMENT_TYPE,
    SET_DOCUMENT_MODAL_CUSTOMER_SALES,
    SET_DOCUMENT_TYPE_CUSTOMER_SALES,
    GET_TIKET_CONFIGURATION,
    GET_PAYMENT_METHOD,
    GET_PAYMENT_METHOD_DETAIL,
    SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES,
    SET_PAYMENT_METHOD_CUSTOMER_SALES,
    ADD_SALE,
    PRINT_TIKET,
    GET_ALL_PRINT,
    SET_ORDER_CUSTOMER_SALES,
    SET_ORDER_SELECTED_CUSTOMER_SALES,
    SET_CLEAN_SELECT_DETAIL_CUSTOMER_SALES,
    CUSTOMER_SALES_CHANGE_CHANNEL,
    SET_CLIENT_MODAL_CUSTOMER_SALES,
    SET_CUSTOMER_CUSTOMER_SALES,
    SET_CUSTOMER,
    SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES,
} from '../../redux/contants';
import moment from "moment";

const DocumentModal = () => {

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const [userID] = useState(cookies.get('userID')); 
    const [employeeName] = useState(cookies.get('employeeName')); 

    const customerSales = useSelector(state => state.customerSales);
    const customers = useSelector(state => state.customers);
    const prints = useSelector(state => state.prints);
    const documentTypes = useSelector(state => state.documentTypes);
    const paymentMethods = useSelector(state => state.paymentMethods);
    const paymentMethodDetails = useSelector(state => state.paymentMethodDetails);
    const tiketConfigurations = useSelector(state => state.tiketConfigurations);
    const [documetnTypeID, setDocumentTypeID] = useState('');
    const [documentTypeName, setDocumentTpeName] = useState('');
    const [paymentMethodName, setPaymentMethodName] = useState('');
    const [paymentMethodID, setPaymentMethodID] = useState('');
    const [paymentMethodDetailName, setPaymentMethodDetailName] = useState('');
    const [paymentMethodDetailID, setPaymentMethodDetailID] = useState('');
    const [cashRecibe, setCashRecibe] = useState(0);
    const [bundle, setBundle] = useState(0.00);

    const documents = useSelector(state => state.documents);

    useEffect(()=>{
        dispatch({type: GET_ALL_CUSTOMER_SALES});
        dispatch({type: GET_DOCUMENT});
        dispatch({type: GET_DOCUMENT_TYPE});
        dispatch({type: GET_TIKET_CONFIGURATION});
        dispatch({type: GET_ALL_PRINT});
        dispatch({type: GET_PAYMENT_METHOD});
        dispatch({type: GET_PAYMENT_METHOD_DETAIL});
    },[dispatch])

    const lastItemInDocuments = async () => {
        const documentData = await getDocument();
        if(documentData !== null || documentData !== ""){
            let documentSelected = customerSales.documentTypeSelected;
            if(customerSales.channelSelectedID == 5 || customerSales.channelSelectedID == 4){
                documentSelected = {id:4};
            }
            if(customerSales.channelSelectedID == 3){
                documentSelected = {id:4};
            }
            const documentsForType = (documentData).filter((document)=>{
                return document.documentTypeID == documentSelected.id
            })
            const lastDocument = (documentsForType[documentsForType.length-1]);
            return lastDocument;
        }
        return 0;
    };

    const PaymentDetailButton = () => {
        paymentMethodDetails

        if(paymentMethodDetails.allItems != undefined && paymentMethodDetails.allItems != ''){

            if(paymentMethodID == 2){
                setPaymentMethodDetailID(4)
                setPaymentMethodDetailName('Dolar estadounidense');
                return(<></>);
            }
            if(customerSales.channelSelectedID == 5 || customerSales.channelSelectedID == 4){
                setPaymentMethodDetailID(4)
                setPaymentMethodDetailName('Dolar estadounidense');
                return(<></>);
            }
            if(customerSales.channelSelectedID == 3){
                setPaymentMethodDetailID(12)
                setPaymentMethodDetailName('Delivery');
                return(<></>);
            }
            const resFilterStatus = (paymentMethodDetails.allItems).filter((paymentMethodDetail)=>{
                return paymentMethodDetail.status == 0 && paymentMethodID == paymentMethodDetail.paymentMethodID
            });
            const listButtons = resFilterStatus.map((paymentMethodDetail)=>{
                return(<>
                    <Col sm={12} md={4} lg={4} className="no-margin no-paddin">
                        <Button
                            outline={paymentMethodDetail.id != paymentMethodDetailID}
                            color="primary"
                            className="btn-payment-method"
                            onClick={()=>{
                                setPaymentMethodDetailID(paymentMethodDetail.id);
                                setPaymentMethodDetailName(paymentMethodDetail.name);
                                const paymentMethodDetailData = {
                                    id:paymentMethodDetail.id,
                                    name:paymentMethodDetail.name
                                }
                                dispatch({type:SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES, paymentMethodDetail:paymentMethodDetailData});
                            }}
                        >
                        {paymentMethodDetail.name}
                        </Button>
                    </Col>
                </>);
            });
            return listButtons;
        }
    };

    const PaymentButton = () => {
        if(paymentMethods.allItems != undefined && paymentMethods.allItems != ''){

            if(customerSales.channelSelectedID == 5 || customerSales.channelSelectedID == 4){
                setPaymentMethodID(2)
                setPaymentMethodName('Efectivo');
                return(<></>);
            }
            if(customerSales.channelSelectedID == 3){
                setPaymentMethodID(4)
                setPaymentMethodName('Delivery');
                return(<></>);
            }

            const resFilterStatus = (paymentMethods.allItems).filter((paymentMethod)=>{
                return paymentMethod.status == 0 && paymentMethod.id != 4;
            });
            const listButtons = resFilterStatus.map((paymentMethod)=>{
                return(<>
                    <Col sm={12} md={4} lg={4} className='no-margin no-paddin'>
                        <Button
                            outline={paymentMethod.id != paymentMethodID}
                            color="primary"
                            className="btn-payment-method"
                            onClick={()=>{
                                setPaymentMethodID(paymentMethod.id);
                                setPaymentMethodName(paymentMethod.name);
                                const paymentMethodData = {
                                    id:paymentMethod.id,
                                    name:paymentMethod.name
                                }
                                dispatch({type:SET_PAYMENT_METHOD_CUSTOMER_SALES, paymentMethod:paymentMethodData});
                            }}
                        >
                            <span className="btn-payment-method-text">
                                {paymentMethod.name}
                            </span>
                        </Button>
                    </Col>
                </>);
            });
            return listButtons;
        }
    };

    const DocumentButton = () => {
        if(documentTypes.allItems !== undefined){
            if(customerSales.channelSelectedID == 5 || customerSales.channelSelectedID == 4){
                setDocumentTpeName('Ticket')
                setDocumentTypeID(4);
                return(<></>);
            }
            if(customerSales.channelSelectedID == 3){
                setDocumentTpeName('Ticket')
                setDocumentTypeID(4);
                return(<></>);
            }
            const resFilterStatus = (documentTypes.allItems).filter((documentType)=>{
                return documentType.status == 0;
            })
            const listButtons = resFilterStatus.map((documentType)=>{
                return(<>
                    <Col sm={12} md={3} lg={3}>
                        <Button
                            outline={documentType.id != documetnTypeID}
                            color="primary"
                            className="btn-document-type"
                            onClick={()=>{
                                setDocumentTypeID(documentType.id);
                                setDocumentTpeName(documentType.name);
                                const documentTypeData = {
                                    id:documentType.id,
                                    name:documentType.name
                                }
                                dispatch({type:SET_DOCUMENT_TYPE_CUSTOMER_SALES, documentType:documentTypeData});
                            }}
                        >
                        {documentType.name}
                        </Button>
                    </Col>
                </>);
            });
            return listButtons;
        }
        return(<></>);
    };

    const createSale = async (document, paymentMethodDetailName) => {
        const date = moment(localStorage.getItem('dateSales') != undefined ? localStorage.getItem('dateSales'): new Date()).format("YYYY-MM-DD");
        const hour = moment(new Date()).format("HH:mm:ss");
        const tiketNumber = document.id;
        const description = customerSales.description;
        const channel = customerSales.channelSelectedName;
        const tiketDetail = tiketConfigurations.Items[0];
        const customerID = customerSales.customerSelected == '' ? null : customerSales.customerSelected.id;
        const customerName = customerSales.customerSelected == '' ? null : customerSales.customerSelected.name;
        const paymentMethod = paymentMethodDetailName;
        const cashRegisterNumber = tiketDetail.cashRegisterNumber;
        const restaurant = tiketDetail.enterprise;
        const totalWithTax = customerSales.total;
        const tax = (totalWithTax*0.13);
        const totalWithoutTax = totalWithTax - tax;
        const totalDiscount = 0.00;
        const totalWithDiscount = totalWithTax - totalDiscount;
        const orderSelected = customerSales.orderSelected;
        const order = customerSales.order;

        const tip = 0.00;
        let cutX;
        // if(customerSales?.cutX?.id != null){
            // cutX = customerSales.cutX.id;
        // }else{
            cutX = localStorage.getItem('idcashdesk')
        // }

        if(cutX == 0 || cutX == undefined || cutX == null){
            return(
                <ModalCashDesk />
            )
        }else{
            const newData = {
                tiketNumber,
                cashRegisterNumber,
                restaurant,
                channel,
                paymentMethod,
                date,
                hour,
                totalWithoutTax,
                totalDiscount,
                totalWithDiscount,
                tax,
                totalWithTax,
                tip,
                cutX,
                status:0,
                documentID:document.id,
                userID,
                customerID,
                userCreate: userID,
            }
            dispatch({
                type: ADD_SALE, 
                sale:newData, 
                document, 
                order, 
                employeeName, description,
                customerName:customerName,
                channel:customerSales.channelSelectedID,
                discountSubchannel:customerSales.discountSubchannel,
            });
            voids.updateOrders(orderSelected,[]);
            dispatch({type:SET_ORDER_SELECTED_CUSTOMER_SALES,orderSelected:0})
            dispatch({
                type: SET_ORDER_CUSTOMER_SALES,
                order: [],
                total: 0.0,
                discounts:0.0,
            });
            dispatch({type: SET_CLEAN_SELECT_DETAIL_CUSTOMER_SALES});
            dispatch({type: CUSTOMER_SALES_CHANGE_CHANNEL, channel:{name:'Restaurante', id:2}})
            dispatch({type:SET_DISCOUNT_SUBCHANNEL_CUSTOMER_SALES,discountSubchannel:0.00})
            setDocumentTpeName('');
            setDocumentTypeID('');
            setPaymentMethodDetailID('');
            setPaymentMethodDetailName('');
            setPaymentMethodID('');
            setPaymentMethodName('');
            setCashRecibe(0.00);
            setBundle(0.00);
            voids.deleteOrders(customerSales.orderSelected);
        }

    };

    const updateDocument = () => {

    };

    const detailBundle = (value) =>{
        const total = customerSales.total-customerSales.discounts;
        let result = value - total;
        if(result < 0){
            result = 0;
        }
        setBundle(result);
    }

    const DetailCash = useMemo(()=>{
        if(paymentMethodName == 'Efectivo' && customerSales.channelSelectedID != 5 && customerSales.channelSelectedID != 4){
            return(<>
                <Row>
                    <Col sm={3} className="no-margin no-paddin">
                        <Button
                            outline
                            color="primary"
                            className="btn-payment-method-detail"
                            onClick={()=>{
                                setCashRecibe(parseInt(cashRecibe)+5);
                                detailBundle(parseInt(cashRecibe)+5);
                            }}
                        >
                            $5
                        </Button>
                    </Col>
                    <Col sm={3} className="no-margin no-paddin">
                        <Button
                            outline
                            color="primary"
                            className="btn-payment-method-detail"
                            onClick={()=>{
                                setCashRecibe(parseInt(cashRecibe)+10);
                                detailBundle(parseInt(cashRecibe)+10);
                            }}
                        >
                            $10
                        </Button>
                    </Col>
                    <Col sm={3} className="no-margin no-paddin">
                        <Button
                            outline
                            color="primary"
                            className="btn-payment-method-detail"
                            onClick={()=>{
                                setCashRecibe(parseInt(cashRecibe)+20);
                                detailBundle(parseInt(cashRecibe)+20);
                            }}
                        >
                            $20
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} className="no-margin no-paddin">
                        <Button
                            outline
                            color="primary"
                            className="btn-payment-method-detail"
                            onClick={()=>{
                                setCashRecibe(0);
                                detailBundle(0);
                            }}
                        >
                            <i className="iconsminds-refresh" style={{'fontSize':'16px'}} />
                        </Button>
                    </Col>
                    <Col sm={3} className="no-margin no-paddin">
                    <Button
                            outline
                            color="primary"
                            className="btn-payment-method-detail"
                            onClick={()=>{
                                const total = customerSales.total-customerSales.discounts;
                                setCashRecibe(parseFloat(total).toFixed(2));
                                detailBundle(0);
                            }}
                        >
                            Exact.
                            {/* <i className="iconsminds-refresh" style={{'fontSize':'16px'}} /> */}
                        </Button>
                    </Col>
                </Row>
                <div className="mt-3 mb-3">
                    <Label>Entrega el cliente</Label>
                    <Input
                        type="number"
                        min='0'
                        className="rounded"
                        placeholder=""
                        value={cashRecibe}
                        onKeyPress={(e)=>{
                            const res = globalValidator.onlyDecimal(e.key);
                            if(res.status){
                                e.preventDefault();
                            }
                        }}
                        onChange={(e)=>{
                            setCashRecibe(e.target.value);
                            const total = customerSales.total-customerSales.discounts;
                            let result = e.target.value - total;
                            if(result < 0){
                                result = 0;
                            }
                            setBundle(result);
                        }}
                    />
                </div>
                <div className="mt-3 mb-3">
                    <h3>Cambio: ${parseFloat(bundle).toFixed(2)}</h3>
                </div>
            </>)
        }
        return(<></>);
    },[cashRecibe, paymentMethodName, paymentMethodID, customerSales.channelSelectedID])

    const DocumentType = () => {
        if(documentTypes.allItems !== null && documentTypes.allItems !== ''){
            return(
                <Row className="mt-4">
                    <Col sm={12} md={12} lg={12}>
                        <div className="mt-3 mb-3"
                            hidden={
                                customerSales.channelSelectedID == 5 || 
                                customerSales.channelSelectedID == 4 ||
                                customerSales.channelSelectedID == 3
                                ? true : 0
                            }
                        >
                            <Label>Selecciona el tipo de documento</Label>
                            <Row>
                                <DocumentButton />
                            </Row>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div className="mt-3 mb-3"
                            hidden={
                                customerSales.channelSelectedID == 5 || 
                                customerSales.channelSelectedID == 4 ||
                                customerSales.channelSelectedID == 3
                                ? true : 0}
                        >
                            <Label>Selecciona el método de pago</Label>
                            <Row>
                                <PaymentButton />
                            </Row>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div className="mt-3 mb-3"
                            hidden={
                                customerSales.channelSelectedID == 5 || 
                                customerSales.channelSelectedID == 4 ||
                                customerSales.channelSelectedID == 3 ||
                                paymentMethodID == ''
                                ? true : 0}
                        >
                            <Label>Selecciona el detalle del método de pago</Label>
                            <Row>
                                <PaymentDetailButton/>
                            </Row>
                        </div>
                    </Col>
                </Row>
            );
        }
        return(<></>);
    };

    const DefaultDetail = () => {
        return(
            <>
                <h4>Tipo de documento: <b>Ticket</b></h4>
                <h4>Método de pago: <b>Efectivo</b></h4>
            </>
        );
    };

    const DefaultDetailInDelivery = () => {
        return(
            <>
                <h4>Tipo de documento: <b>Ticket</b></h4>
                <h4>Método de pago: <b>Delivery</b></h4>
            </>
        )
    }

    return (<>
        <Modal
            isOpen={customerSales.documentModal}
            size="lg"
            wrapClassName="modal-right"
            backdrop={false}
            toggle={() => {
                dispatch({type: SET_DOCUMENT_MODAL_CUSTOMER_SALES, status: !customerSales.documentModal})
            }}
            // wrapClassName="modal-left"
        >
            <ModalBody>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <h2>Detalle de compra</h2>
                            </Col>
                            <Col sm={12}
                                hidden={customerSales.channelSelectedID != 5 && customerSales.channelSelectedID != 4 ? true : false}
                            >
                                <DefaultDetail />
                            </Col>
                            <Col sm={12}
                                hidden={customerSales.channelSelectedID  != 3}
                            >
                                <DefaultDetailInDelivery />
                            </Col>
                        </Row>
                        <DocumentType />
                        {DetailCash}
                        
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <ListItems />
                        <Row className="mt-4">
                            <Button
                                // outline
                                color="primary"
                                size="sm"
                                className="btn-block"
                                style={{ borderRadius: '10px' }}
                                onClick={async ()=>{
                                    if(documentTypeName == ''){
                                        warningMessage('', 'Selecciona el tipo de documento')
                                        return
                                    }
                                    if(paymentMethodDetailName == ''){
                                        warningMessage('', 'Selecciona un detalle de método de pago')
                                        return
                                    }
                                    if(paymentMethodName == ''){
                                        warningMessage('', 'Selecciona un método de pago')
                                        return
                                    }
                                    const lastItem = await lastItemInDocuments();
                                    
                                    // if channel is Administrative or Gif
                                    if(customerSales.channelSelectedID == 4 && customers.customerSelected == ''){
                                        swMessage(
                                            'ERROR',
                                            'Agrega el nombre del cliente',
                                            'warning',
                                            2000
                                        )
                                        dispatch({type:SET_CLIENT_MODAL_CUSTOMER_SALES, status:true});
                                    }else if(customerSales.channelSelectedID == 5 && customers.customerSelected == ''){
                                        swMessage(
                                            'ERROR',
                                            'Agrega el nombre del cliente',
                                            'warning',
                                            2000
                                        )
                                        dispatch({type:SET_CLIENT_MODAL_CUSTOMER_SALES, status:true});
                                    }else{
                                        
                                        createSale(lastItem, paymentMethodDetailName);
                                        dispatch({type: SET_DOCUMENT_MODAL_CUSTOMER_SALES, status: !customerSales.documentModal})                                
                                        const paymentMethodDetailData = {
                                            name: paymentMethodDetailName,
                                            id: paymentMethodDetailID
                                        };
                                        dispatch({type: SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES, paymentMethodDetail: paymentMethodDetailData});                                
                                        // clean customer global state 
                                        dispatch({type: SET_CUSTOMER_CUSTOMER_SALES, customer: ''});
                                        dispatch({type: SET_CUSTOMER, customer:''});
                                    }

                                }}    
                            >
                                Aceptar
                            </Button>
                            <Button
                                outline
                                color="primary"
                                className="btn-block"
                                style={{ borderRadius: '10px' }}

                                size="sm"
                                onClick={()=>{
                                    dispatch({type: SET_DOCUMENT_MODAL_CUSTOMER_SALES, status: !customerSales.documentModal})
                                    dispatch({type: SET_ORDER_CUSTOMER_SALES, order:[], total:0.00, discounts:0.00});
                                    setPaymentMethodDetailID('');
                                    setPaymentMethodDetailName('');
                                    setPaymentMethodID('');
                                    setPaymentMethodName('');
                                    setDocumentTpeName('');
                                    setDocumentTypeID('');
                                    dispatch({type:SET_PAYMENT_METHOD_DETAIL_CUSTOMER_SALES, paymentMethodDetail:''});
                                    dispatch({type:SET_PAYMENT_METHOD_CUSTOMER_SALES, paymentMethod:''});
                                    dispatch({type:SET_DOCUMENT_TYPE_CUSTOMER_SALES, document:''});
                                    setBundle(0);
                                    setCashRecibe(0);
                                }}    
                            >
                                Cancelar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    </>);
};

export default DocumentModal;