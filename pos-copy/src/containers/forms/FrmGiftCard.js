import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input
 } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { 
    ADD_GIFTCARD,
    CLOSE_FORM_GIFTCARD,
    UPDATE_GIFTCARD,
    REMOVE_GIFTCARD,
} from "redux/contants";
import { successMessage } from 'helpers/messages'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationGiftCard";

const FrmGiftCard = (props)=>{

    const {giftcard, customers, brands} = props;
    const {index} = props;
    const [collapse, setCollapse] = useState(giftcard.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [name, setName] = useState(giftcard.name);
    const [totalBalance, setTotalBalance] = useState(giftcard.totalBalance);
    const [currentBalance, setCurrentBalance] = useState(giftcard.currentBalance);
    const [customerID, setCustomerID] = useState(giftcard.customerID);
    const [customerName, setCustomerName] = useState(giftcard.customerName);
    const [restaurantID, setRestaurantID] = useState(giftcard.restaurantID);
    const [restaurantName, setRestaurantName] = useState(giftcard.restaurantName);

    const selectRestaurants = () => {
        if(brands !== undefined){
            const res = brands.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const selectCustomers = () => {
        if(customers !== undefined){
            const res = customers.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };
    const dispatch = useDispatch();

    const updateClick = () => {
        const newData = {
            ...giftcard, 
            name,
            totalBalance, 
            currentBalance, 
            customerID,
            customerName,
            restaurantID,
            restaurantName
        }
        if(validation.data(newData)){
            dispatch({type: UPDATE_GIFTCARD, giftcard: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_GIFTCARD})
        }
    };

    const addClick = () => {
        const newData = {
            ...giftcard, 
            name,
            totalBalance, 
            currentBalance, 
            customerID,
            customerName,
            restaurantID,
            restaurantName
        }
        if(validation.data(newData)){
            dispatch({type: ADD_GIFTCARD, giftcard: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_GIFTCARD})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...giftcard, status:newStatus};
        dispatch({type: REMOVE_GIFTCARD, giftcard: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = !(giftcard.status);
        if(!newStatus){
            Swal.fire({
                title: 'Estás seguro de eliminar este item',
                text: "Permanecera oculto hasta que vuelva a integrarlo a la aplicación",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si deseo eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeFinish(newStatus);
                }
            })
        }else{
            removeFinish(newStatus);
        }
    };

    return(
        <>
            <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                        <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span className="heading-number d-inline-block mt-2 mb-2">
                                {index}
                            </span>
                            <h3>{giftcard.name}</h3>
                            <p><b>Total: </b>{giftcard.totalBalance} <b>Actual: </b>{giftcard.currentBalance}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={giftcard.status ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={giftcard.status ? 'theme-3' : 'light'}
                            className={`icon-button ml-1 rotate-icon-click ${
                            collapse ? 'rotate' : ''
                            }`}
                            onClick={() => {
                                setCollapse(!collapse);
                                setAdd(!add);
                            }}
                        >
                            <i className="simple-icon-arrow-down" />
                        </Button>
                        <Button
                            outline
                            color={giftcard.status ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={giftcard.status ? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
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
                                    <div className="mt-3 mb-3">
                                        <Label>Restaurante</Label>
                                        <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select rounded"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        defaultValue={{label:restaurantName, value:restaurantID}}
                                        onChange={(e)=>{
                                            setRestaurantID(e.key);
                                            setRestaurantName(e.value);
                                        }}
                                        options={selectRestaurants()}
                                        />
                                    </div>
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
                                    <div className="mt-3 mb-3">
                                    <Label>Total</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el total de saldo"
                                        value={totalBalance}
                                        onChange={(e)=>{setTotalBalance(e.target.value)}}
                                    />
                                    </div>
                                    <div className="mt-3 mb-3">
                                    <Label>Actual</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el saldo actual"
                                        value={currentBalance}
                                        onChange={(e)=>{setCurrentBalance(e.target.value)}}
                                    />
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_GIFTCARD})}}
                                        >
                                            <i className="simple-icon-close btn-group-icon" /> Cancelar
                                        </Button>
                                        <Button
                                            // outline
                                            color="primary"
                                            className="m-1"
                                            onClick={()=>{
                                                if(add){
                                                    addClick();
                                                }else{
                                                    updateClick();
                                                }
                                            }}
                                        >
                                            <i className="simple-icon-plus btn-group-icon" /> Guardar
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </Collapse>
            </Card>
        </>    
    );
};

export default FrmGiftCard;