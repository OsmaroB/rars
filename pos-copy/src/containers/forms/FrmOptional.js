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
import { 
    UPDATE_OPTIONAL,
    CLOSE_FORM_OPTIONAL,
    ADD_OPTIONAL,
    REMOVE_OPTIONAL
} from "redux/contants";

import { successMessage } from 'helpers/messages'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationOptional";
import Cookies from 'universal-cookie';

const FrmOptional = (props)=>{

    const {optional} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [name, setName] = useState(optional.name);
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const updateClick = () => {
        const newData = {
            ...optional, 
            name,
            userUpdate:userID
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_OPTIONAL, optional: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_OPTIONAL})
        }
    };

    const addClick = () => {
        const newData = {
            ...optional, 
            name,
            userCreate:userID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_OPTIONAL, optional: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_OPTIONAL})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...optional, status:newStatus};
        dispatch({type: REMOVE_OPTIONAL, optional: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = optional.status === 0 ? 1 : 0;
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

    return(
        <>
            <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                        <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span className="heading-number d-inline-block mt-2 mb-2">
                                {index}
                            </span>
                            <h3>Opcional: {optional.name}</h3>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={optional.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={optional.status === 0 ? 'theme-3' : 'light'}
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
                            color={optional.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={optional.status === 0? 'simple-icon-ban' : 'simple-icon-check'} />
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
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_OPTIONAL})}}
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

export default FrmOptional;