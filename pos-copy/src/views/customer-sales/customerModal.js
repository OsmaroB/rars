import React, {useEffect, useState, useMemo} from "react";
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
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import successMessage from "helpers/messages";
import validation from "containers/validations/ValidationCustomer";
import Cookies from 'universal-cookie';
import {
    GET_ALL_CUSTOMER_SALES,
    GET_CUSTOMER,
    SET_CLIENT_MODAL_CUSTOMER_SALES,
    ADD_CUSTOMER,
    GET_ALL_CUSTOMER,
    SET_CUSTOMER_CUSTOMER_SALES,
    SET_CUSTOMER
} from '../../redux/contants';

const CustomerModal = () => {

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const [userID] = useState(cookies.get('userID')); 

    const customerSales = useSelector(state => state.customerSales);
    const customers = useSelector(state => state.customers);
    const [customerID, setCustomerID] = useState(customers.customerSelected?.id);
    const [customerName, setCustomerName] = useState(customers.customerSelected?.name);
    const [status, setStatus] = useState(0);
    const [statusName, setStatusName] = useState('');
    const [dui, setDui] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        dispatch({type: GET_ALL_CUSTOMER_SALES});
        dispatch({type: GET_CUSTOMER});
        dispatch({type: GET_ALL_CUSTOMER});
    },[dispatch])


    const selectCustomers = () => {
        if(customers !== undefined){
            const res = (customers.allItems).map((item)=>{
                return{label: `${item.name} - ${item.dui}`, value: `${item.name} - ${item.dui}`, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const selectStatus = () => {
        return[
            {label: 'Buscar usuario', value:'Buscar usuario', key:0},
            {label: 'Crear usuario', value:'Buscar usuario', key:1},
            
        ]
    };

    const addClick = () => {
        const newData = {
            id:'',
            dui,
            name,
            lastName, 
            email,
            userCreate:userID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_CUSTOMER, customer: newData});
            return true
        }
        return false
    };

    const SearchCustomer = () => {
        if(status == 0){
            return(
                <Row className="mt-4">
                    <Col sm={12} md={12} lg={12}>
                        <div className="mt-3 mb-3">
                            <Label>Cliente</Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select rounded"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            defaultValue={{label:customerName, value:customerID}}
                            onChange={(e)=>{
                                setCustomerID(e.key);
                                setCustomerName(e.value);
                            }}
                            options={selectCustomers()}
                            />
                        </div>
                    </Col>
                </Row>
            );
        }
        return(<></>);
    };

    const CreateCustomerMemo = useMemo(()=>{
        if(status != 0){
            return(
                <Form>
                    <FormGroup>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <div className="mt-3 mb-3">
                                    <Label>DUI</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el DUI con formato 00000000-0"
                                        value={dui}
                                        onChange={(e)=>{setDui(e.target.value)}}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <div className="mt-3 mb-3">
                                    <Label>Nombre</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el nombre"
                                        value={name}
                                        onChange={(e)=>{setName(e.target.value)}}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <div className="mt-3 mb-3">
                                    <Label>Apellido</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el nombre"
                                        value={lastName}
                                        onChange={(e)=>{setLastname(e.target.value)}}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={6}>
                                <div className="mt-3 mb-3">
                                    <Label>Email</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el email"
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            )
        }
        return(<></>);
    },[dui,name,lastName,email,status])

    return (<>
        <Modal
            isOpen={customerSales.clientModal}
            size=""
            toggle={() => {
                dispatch({type: SET_CLIENT_MODAL_CUSTOMER_SALES, status: !customerSales.clientModal})
            }}
            // wrapClassName="modal-left"
        >
            <ModalBody>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <h3>Clientes</h3>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col sm={12} md={12} lg={12}>
                        <div className="mt-3 mb-3">
                            <Label>Selecciona una opción</Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select rounded"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            defaultValue={{label:statusName, value:status}}
                            onChange={(e)=>{
                                setStatus(e.key);
                                setStatusName(e.value);
                            }}
                            options={selectStatus()}
                            />
                        </div>
                    </Col>
                </Row>
                <SearchCustomer />
                {CreateCustomerMemo}
                <Row className="mt-4">
                    <Col sm={12} md={6} lg={3}>
                        <Button
                            outline
                            color="primary"
                            size="sm"
                            onClick={()=>{
                                dispatch({type: SET_CLIENT_MODAL_CUSTOMER_SALES, status: !customerSales.clientModal})
                            }}    
                        >
                            Cancelar
                        </Button>
                    </Col>
                    <Col sm={12} md={12} lg={3}>
                        <Button
                            // outline
                            color="primary"
                            size="sm"
                            onClick={()=>{
                                if(status == 0){
                                    const customerData = {
                                        name: customerName,
                                        id: customerID,
                                    }
                                    dispatch({type: SET_CUSTOMER_CUSTOMER_SALES, customer: customerData});
                                    dispatch({type: SET_CUSTOMER, customer:customerData});
                                    dispatch({type: SET_CLIENT_MODAL_CUSTOMER_SALES, status: !customerSales.clientModal})

                                }else{
                                    if(addClick()){
                                        dispatch({type: SET_CLIENT_MODAL_CUSTOMER_SALES, status: !customerSales.clientModal})
                                    }

                                }
                            }}    
                        >
                            Agregar
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    </>);
};

export default CustomerModal;