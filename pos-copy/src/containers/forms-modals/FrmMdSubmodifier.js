import React, {useState, useEffect} from "react";
import {
    Row, 
    Col,
    Card,
    Label,
    Input,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    CustomInput
} from 'reactstrap';
import {
    CLOSE_CARD_FORM_DEPMODIFIER,
    GET_ALL_CARD_DEPMODIFIER,
    OPEN_CARD_FORM_DEPMODIFIER,
    GET_DEPMODIFIER
} from "redux/contants";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { successMessage } from 'helpers/messages';
import Cookies from 'universal-cookie';
import FrmCardDepmodifier from "containers/forms-cards/FrmCardDepmodifier";
import CardsDepModifier from "containers/cards/CardsDepmodifier";

const FrmMdSubmodifier = (props) => {

    const {submodifier} = props;
    const cardDepmodifier = useSelector(state => state.cardDepmodifier);
    const depmodifiers = useSelector(state => state.depmodifiers);
    const dispatch = useDispatch();
    const nameSubmodifier = submodifier.name != undefined ? submodifier.name : '';
    const [name, setName] = useState(nameSubmodifier);
    
    useEffect(()=>{
        dispatch({type: GET_DEPMODIFIER});
        dispatch({type: GET_ALL_CARD_DEPMODIFIER,
        });
    },[]);


    return(<>
        <div className="d-flex flex-grow-1 min-width-zero">
                <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                        <h3>Sub Agregado: {submodifier.name != undefined ? submodifier.name : ''}</h3>
                    </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                        outline
                        color='theme-3'
                        className="icon-button ml-1"
                        onClick={()=>{

                        }}
                    >
                        <i className='simple-icon-ban'/>
                    </Button>
                </div>
            </div>
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
                                <Col sm="12 mb-3">
                                    <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
                                        <CustomInput
                                        className="itemCheck mb-0"
                                        type="checkbox"
                                        checked={cardDepmodifier.addItem}
                                        onChange={()=>{ 
                                            if(cardDepmodifier.addItem == undefined || cardDepmodifier.addItem == false){
                                                dispatch({type: OPEN_CARD_FORM_DEPMODIFIER});
                                            }else{
                                                dispatch({type: CLOSE_CARD_FORM_DEPMODIFIER});
                                            }
                                            
                                        }}
                                        label="¿Quieres agregar un sub Agregado de 2do nivel?"
                                        />
                                    </div>
                                </Col>
                                <Col sm={12} md={4} lg={4} hidden={!(cardDepmodifier.addItem)}>
                                    <FrmCardDepmodifier
                                        submodifier={submodifier}
                                        depmodifier={null}
                                        statusCard='create'
                                    />
                                </Col>
                                <CardsDepModifier 
                                    submodifier={submodifier}
                                    depmodifiers={depmodifiers}
                                />
                            </Row>
                            <div className="text-right">
                                <Button
                                    outline
                                    color="primary"
                                    className="m-1"
                                    // onClick={() => {dispatch({type: CLOSE_FORM_MODIFIER})}}
                                >
                                    <i className="simple-icon-close btn-group-icon" /> Cancelar
                                </Button>
                                <Button
                                    // outline
                                    color="primary"
                                    className="m-1"
                                    onClick={()=>{
                                        // if(add){
                                        //     addClick();
                                        // }else{
                                        //     updateClick();
                                        // }
                                    }}
                                >
                                    <i className="simple-icon-plus btn-group-icon" /> Guardar
                                </Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
    </>)
};

export default FrmMdSubmodifier;