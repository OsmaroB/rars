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
    ADD_SUBCATEGORY, 
    CLOSE_FORM_SUBCATEGORY,
    UPDATE_SUBCATEGORY, 
    REMOVE_SUBCATEGORY 
} from "redux/contants";
import { successMessage } from 'helpers/messages';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import validation from "containers/validations/ValidationSubCategory";


const FrmSubCategory = (props)=>{

    const {subcategory, categories} = props;
    const {index} = props;
    const [collapse, setCollapse] = useState(subcategory.collapse);
    const [add, setAdd] = useState(true);
    const [name, setName] = useState(subcategory.name);
    const [categoryID, setCategoryID] = useState(subcategory.category.id);
    const [category, setCategory] = useState(subcategory.category.name)
    const selectData = () => {
        if(categories !== undefined){
            const res = categories.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };
    const dispatch = useDispatch();

    const updateClick = () => {
        const newData = {
            ...subcategory, 
            name, 
            categoryID,
            categoryName:category,
            category:{
                name:category,
                id:categoryID
            }
        }
        if(validation.data(newData)){
            dispatch({type: UPDATE_SUBCATEGORY, subcategory: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_SUBCATEGORY});
        }
    };

    const addClick = () => {
        const newData = {
            ...subcategory,
             name,
            categoryID, 
            categoryName:category,
            category:{
                name:category,
                id:categoryID
            }
        }
        if(validation.data(newData)){
            dispatch({type: ADD_SUBCATEGORY, subcategory: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_SUBCATEGORY});
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...subcategory, status:newStatus};
        dispatch({type: REMOVE_SUBCATEGORY, subcategory: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = subcategory.status === 0 ? 1 : 0;
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
                            <h3>{subcategory.name}</h3>
                            <p>{subcategory.description}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={subcategory.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={subcategory.status === 0 ? 'theme-3' : 'light'}
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
                            color={subcategory.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={subcategory.status === 0 ? 'simple-icon-ban' : 'simple-icon-check'} />
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
                                        <Label>Categoria</Label>
                                        <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select rounded"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        defaultValue={{label:category, value:categoryID}}
                                        onChange={(e)=>{
                                            setCategoryID(e.key);
                                            setCategory(e.value);
                                        }}
                                        options={selectData()}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_SUBCATEGORY})}}
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

export default FrmSubCategory;