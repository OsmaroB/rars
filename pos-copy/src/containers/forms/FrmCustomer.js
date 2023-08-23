import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
 } from 'reactstrap';
 import { useDispatch } from "react-redux";
 import { 
    CLOSE_FORM_CUSTOMER,
    UPDATE_CUSTOMER,
    ADD_CUSTOMER,
    REMOVE_CUSTOMER,
} from "redux/contants"; 
import { successMessage } from 'helpers/messages'
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationCustomer";
import Cookies from 'universal-cookie';

const FrmCustomer = (props)=>{

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 
    const {customer} = props;
    const {index} = props;
    const {add} = props;
    const [collapse, setCollapse] = useState(customer.collapse);

    const [dui, setDui] = useState(customer.dui);
    const [name, setName] = useState(customer.name);
    const [lastName, setLastname] = useState(customer.lastName);
    const [email, setEmail] = useState(customer.email);

    
    const updateClick = () => {
        const newData = {
            ...customer, 
            dui,
            name, 
            lastName,
            email,
            userUpdate:userID
        }
        if(validation.data(newData)){
            dispatch({type: UPDATE_CUSTOMER, customer: newData});
        }
    };

    const addClick = () => {
        const newData = {
            ...customer, 
            dui,
            name,
            lastName, 
            email,
            userCreate:userID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_CUSTOMER, customer: newData});
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...customer, status:newStatus};
        dispatch({type: REMOVE_CUSTOMER, customer: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = !(customer.status);
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
                            <h3>{customer.name} {customer.lastName}</h3>
                            <p><b>Email:</b> {customer.email}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={customer.status ? 'theme-3' : 'light'}
                            className={`icon-button ml-1 rotate-icon-click ${
                            collapse ? 'rotate' : ''
                            }`}
                            onClick={() => {
                                setCollapse(!collapse);
                            }}
                        >
                            <i className="simple-icon-arrow-down" />
                        </Button>
                        <Button
                            outline
                            color={customer.status ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={customer.status ? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
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
                                        <Col sm={12} md={12} lg={12}>
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
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_CUSTOMER})}}
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

export default FrmCustomer;