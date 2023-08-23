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
    CLOSE_FORM_DOCUMENT,
    ADD_DOCUMENT,
    REMOVE_DOCUMENT
} from "redux/contants";
import { successMessage } from 'helpers/messages'
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import validation from "containers/validations/ValidationEmployee";
import Cookies from 'universal-cookie';

const FrmDocument = (props)=>{

    const {document, documentTypes} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [startCorrelative, setStartCorrelative] = useState(document.startCorrelative);
    const [finishCorrelative, setFinishCorrelative] = useState(document.finishCorrelative);
    const [documentTypeName, setDocumentTypeName] = useState(document.documentType.name);
    const [documentTypeID, setDocumentTypeID] = useState(document.documentType.id);
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const addClick = () => {
        const newData = {
            ...document, 
            startCorrelative,
            actualCorrelative:startCorrelative,
            finishCorrelative,
            documentTypeID,
            userCreate: userID
        }
        // if(validation.data(newData)){
            dispatch({type: ADD_DOCUMENT, document: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_DOCUMENT})
        // }
    };

    const selectDocumentTypes = () => {
        if(documentTypes.allItems !== undefined){
            const res = (documentTypes.allItems).map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const removeFinish = (newStatus) => {
        const newData = {...document, status:newStatus};
        dispatch({type: REMOVE_DOCUMENT, document: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = document.status === 0 ? 1 : 0;
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
                            <h3>{document.startCorrelative} - {document.finishCorrelative}</h3>
                            <p>Tipo de documento {document.documentType.name}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={document.status === 0 ? 'theme-3' : 'light'}
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
                            color={document.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={document.status === 0? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <div className="mt-3 mb-3">
                                    <Label>Correlativo Inicial</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el nombre"
                                        value={startCorrelative}
                                        onChange={(e)=>{setStartCorrelative(e.target.value)}}
                                    />
                                    </div>
                                    <div className="mt-3 mb-3">
                                    <Label>Correlativo final</Label>
                                    <Input
                                        type="text"
                                        className="rounded"
                                        placeholder="Agregar el apellido"
                                        value={finishCorrelative}
                                        onChange={(e)=>{setFinishCorrelative(e.target.value)}}
                                    />
                                    </div>
                                    <div className="mt-3 mb-3">
                                        <Label>Tipo de documento</Label>
                                        <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select rounded"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        defaultValue={{label:documentTypeName, value:documentTypeID}}
                                        onChange={(e)=>{
                                            setDocumentTypeID(e.key);
                                            setDocumentTypeName(e.value);
                                        }}
                                        options={selectDocumentTypes()}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_DOCUMENT})}}
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

export default FrmDocument;