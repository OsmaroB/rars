import React, {useState, useEffect} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input,
    Row, 
    Col,
    CustomInput,
    Modal,
    ModalBody
 } from 'reactstrap';
import { 
    UPDATE_MODIFIER,
    CLOSE_FORM_MODIFIER,
    ADD_MODIFIER,
    REMOVE_MODIFIER,
    GET_ALL_CARD_SUBMODIFIER,
    OPEN_CARD_FORM_SUBMODIFIER,
    CLOSE_CARD_FORM_SUBMODIFIER,
    SET_MODIFIER_SELECTED_ID_CM,
    STATUS_PRODUCT_CARD_SUBMODIFIER,
} from "redux/contants";

import { successMessage } from 'helpers/messages'
import { useDispatch, useSelector } from "react-redux";
import { GET_SUBMODIFIER } from "redux/contants";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationOptional";
import Cookies from 'universal-cookie';
// FrmCards
import FrmCardSubmodifier from "containers/forms-cards/FrmCardSubmodifier";
import CardSubModifier from "containers/cards/CardsSubmodifier";
import CarouselExample from "views/app/components/carousel/CarouselExample";
import FrmMdModifierProduct from "containers/forms-modals/FrmMdModifierProduct";

const FrmModifier = (props)=>{

    const {modifier} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [name, setName] = useState(modifier.name);
    
    // use 
    const submodifiers = useSelector(state => state.submodifiers);
    const cardSubmodifier = useSelector(state => state.cardSubmodifier);
    const [statusCarrusel, setStatusCarrusel] = useState(false);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    // states for check

    useEffect(()=>{
        dispatch({type: GET_SUBMODIFIER});
        dispatch({type: GET_ALL_CARD_SUBMODIFIER});
    },[]);

    const updateClick = () => {
        const newData = {
            ...modifier, 
            name,
            userUpdate:userID
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_MODIFIER, modifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_MODIFIER})
        }
    };

    const addClick = () => {
        const newData = {
            ...modifier, 
            name,
            userCreate:userID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_MODIFIER, modifier: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_MODIFIER})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...modifier, status:newStatus};
        dispatch({type: REMOVE_MODIFIER, modifier: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = modifier.status === 0 ? 1 : 0;
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

    const NewCarrusel = () => {
        if(statusCarrusel){
            return(
                <CarouselExample/>
            )
        }
        return(<></>);
    };

    const AsignProduct = () => {
        // console.log(modifier.id);
        const id = modifier.id != '' ? modifier.id : null;
        const validation = (submodifiers.allItems).filter((submodifier)=>{
            return submodifier.modifierID == id;
        })
        if(validation.length == 0 && modifier.id == ''){
            return(<></>);
        }
        if(validation.length == 0 && (modifier.id != null || modifier.id != '')){
            return(
                <Col sm={12} md={4} lg={4}>
                    <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
                        <CustomInput
                        className="itemCheck mb-0"
                        type="checkbox"
                        checked={cardSubmodifier.addProduct}
                        onChange={()=>{ 
                            if(cardSubmodifier.addProduct == undefined || cardSubmodifier.addProduct == false){
                                dispatch({type: SET_MODIFIER_SELECTED_ID_CM, modifier:modifier})
                                dispatch({type: STATUS_PRODUCT_CARD_SUBMODIFIER, statusProduct: true});
                            }else{
                                dispatch({type: STATUS_PRODUCT_CARD_SUBMODIFIER, statusProduct: false});
                            }
                        }}
                        label="¿Quieres asignar el agregado a un producto?"
                        />
                    </div>
                </Col>
            )
        }
        return(<></>);
    }

    const valinding = (status, modifier) => {
        if(cardSubmodifier.modifierSelectedID != undefined){
            if(cardSubmodifier.modifierSelectedID.id == modifier.id){
                return status;
            }
            return true;
        }
        return true;
    };

    const validateAsingnProduct = (status, modifier) =>{

    };

    
    const MdModifierProduct = () => {
        return(
            <Modal
            isOpen={cardSubmodifier.addProduct}
            size='lg'
            toggle={() => {
                dispatch({type: STATUS_PRODUCT_CARD_SUBMODIFIER, statusProduct: !(cardSubmodifier.addProduct)});
            }}
            >
                <ModalBody>
                    <FrmMdModifierProduct 
                        modifier={cardSubmodifier.modifierSelectedID}
                        submodifier={null}
                        deomodifier={null}
                    />
                </ModalBody>
            </Modal> 
        );
    };

    return(
        <>
            <MdModifierProduct/>
            <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                        <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span className="heading-number d-inline-block mt-2 mb-2">
                                {index}
                            </span>
                            <h3>Agregado: {modifier.name}</h3>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={modifier.status === 0 ? 'theme-3' : 'light'}
                            className={`icon-button ml-1 rotate-icon-click ${
                            collapse ? 'rotate' : ''
                            }`}
                            onClick={() => {
                                dispatch({type: SET_MODIFIER_SELECTED_ID_CM, modifier:modifier})
                                setCollapse(!collapse);
                                setAdd(!add);
                            }}
                        >
                            <i className="simple-icon-arrow-down" />
                        </Button>
                        <Button
                            outline
                            color={modifier.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {
                                removeClick()
                                setStatusCarrusel(!statusCarrusel);
                            }}
                        >
                            <i className={modifier.status === 0? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row className="mb-4">
                                        <Col sm={12} md={12} lg={12}>
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
                                        <Col sm={12} md={4} lg={4}>
                                            <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
                                                <CustomInput
                                                className="itemCheck mb-0"
                                                type="checkbox"
                                                checked={cardSubmodifier.addItem}
                                                onChange={()=>{ 
                                                    if(cardSubmodifier.addItem == undefined || cardSubmodifier.addItem == false){
                                                        dispatch({type: OPEN_CARD_FORM_SUBMODIFIER});
                                                    }else{
                                                        dispatch({type: CLOSE_CARD_FORM_SUBMODIFIER});
                                                    }
                                                    
                                                }}
                                                label="¿Quieres agregar sub agregado?"
                                                />
                                            </div>
                                        </Col>
                                        <AsignProduct />
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={4} lg={4} hidden={valinding(!(cardSubmodifier.addItem), modifier)}>
                                            <FrmCardSubmodifier
                                                modifier={modifier}
                                                submodifier={null}
                                                statusCard='create'
                                            />
                                        </Col>
                                        <CardSubModifier 
                                            modifier={modifier}
                                            submodifiers={submodifiers}
                                        />
                                    </Row> 
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_MODIFIER})}}
                                        >
                                            <i className="simple-icon-close btn-group-icon" /> Cancelar
                                        </Button>
                                        <Button
                                            // outline
                                            color="primary"
                                            size="sm"
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

export default FrmModifier;