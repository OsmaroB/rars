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
import FrmMdSubmodifier from 'containers/forms-modals/FrmMdSubmodifier';
import {
    CLOSE_CARD_FORM_SUBMODIFIER,
    UPDATE_SUBMODIFIER,
    REMOVE_SUBMODIFIER,
    ADD_SUBMODIFIER
} from "redux/contants";
import Swal from "sweetalert2";
import { successMessage } from 'helpers/messages';
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';

const FrmCardSubmodifier = (props) => {
    
    const {
        modifier, 
        statusCard,
        submodifier
    } = props;
    const modifierID = modifier.id;
    const dispatch = useDispatch();

    const [mdSubmodifier, setMdSubmodifier] = useState(false);
    const [status, setStatus] = useState(statusCard);
    const submodifierName = submodifier != null ? submodifier.name : '';
    const [name, setName] = useState(submodifierName);
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 


    const updateClick = (submodifier) => {
        const newData = {
            ...submodifier, 
            name,
            modifierID,
            userUpdate:userID
        }
        // if(validation.update(newData)){
            dispatch({type: UPDATE_SUBMODIFIER, submodifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            setStatus('readonly');
        // }
    };

    const addClick = () => {
        const newData = {
            ...submodifier, 
            name,
            modifierID,
            userCreate:userID
        }
        // if(validation.data(newData)){
            dispatch({type: ADD_SUBMODIFIER, submodifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            dispatch({type: CLOSE_CARD_FORM_SUBMODIFIER});
        // }
    };

    const removeFinish = (newStatus) => {
        const newData = {...submodifier, status:newStatus};
        dispatch({type: REMOVE_SUBMODIFIER, submodifier: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = submodifier.status === 0 ? 1 : 0;
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
                                <h5>Sub Agregado {submodifier.status == 0 ? '' : '(Desactivado)'}</h5>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={12} lg={12}>
                                <div className="mb-3">
                                    <p>{submodifier.name}</p>
                                </div>
                            </Col>
                            <Col sm={12} md={3} lg={3}>
                                <Button
                                    outline
                                    color='theme-3'
                                    className={`icon-button ml-1 rotate-icon-click`}
                                    onClick={() => {
                                        setMdSubmodifier(!mdSubmodifier);
                                    }}
                                >
                                    <i className="simple-icon-eye" />
                                </Button>
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
                                <h5>Sub Agregado</h5>
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
                                            updateClick(submodifier);
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
                                                dispatch({type: CLOSE_CARD_FORM_SUBMODIFIER});
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

    const MdSubmodifier = () => {
        return(
            <Modal
                isOpen={mdSubmodifier}
                size='lg'
                toggle={() => setMdSubmodifier(!mdSubmodifier)}
            >
                <ModalBody>
                <FrmMdSubmodifier 
                    submodifier={submodifier}
                />
                </ModalBody>
            </Modal>
        )
    };
    
    return(
        <>
            {ReadOnly}
            {Actions}
            <MdSubmodifier />
        </>
    );
};

export default FrmCardSubmodifier;