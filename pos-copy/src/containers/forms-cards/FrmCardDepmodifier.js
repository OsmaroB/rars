import React,{useState, useMemo} from "react";
import {
    Row, 
    Col,
    Card,
    Label,
    Input,
    Container,
    Button,
    Modal,
    ModalBody,
} from 'reactstrap';
import {
    CLOSE_CARD_FORM_DEPMODIFIER,
    UPDATE_DEPMODIFIER,
    REMOVE_DEPMODIFIER,
    ADD_DEPMODIFIER
} from "redux/contants";
import Swal from "sweetalert2";
import { successMessage } from 'helpers/messages';
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';

const FrmCardDepmodifier = (props) => {
    
    const {
        submodifier, 
        statusCard,
        depmodifier
    } = props;
    const submodifierID = submodifier.id;
    const dispatch = useDispatch();

    const [status, setStatus] = useState(statusCard);
    const depmodifierName = depmodifier != null ? depmodifier.name : '';
    const [name, setName] = useState(depmodifierName);
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 


    const updateClick = (depmodifier) => {
        const newData = {
            ...depmodifier, 
            name,
            submodifierID,
            userUpdate:userID
        }
        // if(validation.update(newData)){
            dispatch({type: UPDATE_DEPMODIFIER, depmodifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            setStatus('readonly');
        // }
    };

    const addClick = () => {
        const newData = {
            ...depmodifier, 
            name,
            submodifierID,
            userCreate:userID
        }
        // if(validation.data(newData)){
            dispatch({type: ADD_DEPMODIFIER, depmodifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            dispatch({type: CLOSE_CARD_FORM_DEPMODIFIER});
        // }
    };

    const removeFinish = (newStatus) => {
        const newData = {...depmodifier, status:newStatus};
        dispatch({type: REMOVE_DEPMODIFIER, depmodifier: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = depmodifier.status === 0 ? 1 : 0;
        if(newStatus === 1){
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


    const ReadOnly = useMemo(()=>{
        if(status == 'readonly'){
            return(
                <Card>
                    <Container>
                        <Row className="mt-4">
                            <Col sm={12} md={12} lg={12}>
                                <h5>Agregado 2do. nivel {depmodifier.status == 0 ? '' : '(Desactivado)'}</h5>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={12} lg={12}>
                                <div className="mb-3">
                                    <p>{depmodifier.name}</p>
                                </div>
                            </Col>
                            <Col sm={12} md={3} lg={3}>
                                <Button
                                    outline
                                    color='theme-3'
                                    className={`icon-button ml-1 rotate-icon-click`}
                                    onClick={() => {
                                        if(status == 'update') setStatus('readonly');
                                        if(status == 'readonly') setStatus('update');
                                    }}
                                >
                                    <i className="iconsminds-pen-2" />
                                </Button>
                            </Col>
                            <Col sm={12} md={3} lg={3}>
                                <Button
                                    outline
                                    color='theme-3'
                                    className={`icon-button ml-1 rotate-icon-click`}
                                    onClick={() => {
                                        removeClick();
                                    }}
                                >
                                    <i className="simple-icon-ban" />
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            )
        }
        return(<></>);
    },[status]);

    const Actions = useMemo(()=>{
        if(status == 'create' || status == 'update'){
            return(
                <Card>
                    <Container>
                        <Row className="mt-4">
                            <Col sm={12} md={12} lg={12}>
                                <h5>Sub Agregado de 2do. nivel</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <div className="mt-3 mb-3">
                                    <Label>Nombre</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el nombre"
                                        value={name}
                                        onChange={(e)=>{
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Button
                                    // outline
                                    color="primary"
                                    className=""
                                    onClick={()=>{
                                        if(status == 'update'){
                                            updateClick(depmodifier);
                                        }
                                        if(status == 'create'){
                                            addClick();
                                        }
                                    }}
                                >Guardar</Button>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <div className="text-right">
                                    <Button
                                        outline
                                        color="primary"
                                        className=""
                                        onClick={()=>{
                                            if(submodifier != null){
                                                setStatus('readonly');
                                            }
                                            else{
                                                dispatch({type: CLOSE_CARD_FORM_DEPMODIFIER});
                                            }
                                        }}
                                    >Cancelar</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            );
        }
        return(<></>);
    },[status, name])
    

    return(
        <>
            {ReadOnly}
            {Actions}
        </>
    );
};

export default FrmCardDepmodifier;