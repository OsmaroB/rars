import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Row,
    Input,
 } from 'reactstrap';
 import { successMessage } from 'helpers/messages'
 import { useDispatch } from "react-redux";
 import { Colxx } from 'components/common/CustomBootstrap';
 import Select from 'react-select';
 import CustomSelectInput from 'components/common/CustomSelectInput';
import { 
    ADD_MODIFIER_PRODUCT,
    CLOSE_FORM_MODIFIER_PRODUCT,
    REMOVE_MODIFIER_PRODUCT,
    UPDATE_MODIFIER_PRODUCT
} from "redux/contants";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationModifierProduct";
import Cookies from 'universal-cookie';

const FrmModifierProduct = (props)=>{

    const {modifierProduct, products, modifiers} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // 
    const [modifierName, setModifierName] = useState(modifierProduct.modifier.name);
    const [modifierID, setModifierID] = useState(modifierProduct.modifier.id);
    const [productName, setProductName] = useState(modifierProduct.product.name);
    const [productID, setProductID] = useState(modifierProduct.product.id);

    const selectProducts = () => {
        if(products !== undefined){
            const res = products.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const selectModifiers = () => {
        if(modifiers !== undefined){
            const res = modifiers.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const updateClick = () => {
        const newData = {
            ...modifierProduct, 
            modifierID,
            modifierName,
            productID,
            productName,
            userUpdate:userID,
            product:{
                name:productName
            },
            modifier:{
                name:modifierName
            },
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_MODIFIER_PRODUCT, modifierProduct: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_MODIFIER_PRODUCT});
        }
    };

    const addClick = () => {
        const newData = {
            ...modifierProduct, 
            modifierID,
            modifierName,
            productID,
            productName,
            userCreate:userID,
            product:{
                name:productName
            },
            modifier:{
                name:modifierName
            },
        }
        if(validation.add({newData})){
            dispatch({type: ADD_MODIFIER_PRODUCT, modifierProduct: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_MODIFIER_PRODUCT});
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...modifierProduct, status:newStatus};
        dispatch({type: REMOVE_MODIFIER_PRODUCT, modifierProduct: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = modifierProduct.status === 0 ? 1 : 0;
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
                            <h3>Producto: {modifierProduct.product.name}</h3>
                            <h3>Agregado: {modifierProduct.modifier.name}</h3>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={modifierProduct.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={modifierProduct.status === 0 ? 'theme-3' : 'light'}
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
                            color={modifierProduct.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={modifierProduct.status === 0 ? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Producto</Label>
                                                <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select rounded"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                defaultValue={{label:productName, value:productID}}
                                                onChange={(e)=>{
                                                    setProductID(e.key);
                                                    setProductName(e.value);
                                                }}
                                                options={selectProducts()}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Agregado</Label>
                                                <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select rounded"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                defaultValue={{label:modifierName, value:modifierID}}
                                                onChange={(e)=>{
                                                    setModifierID(e.key);
                                                    setModifierName(e.value);
                                                }}
                                                options={selectModifiers()}
                                                />
                                            </div>
                                        </Colxx>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_MODIFIER_PRODUCT})}}
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

export default FrmModifierProduct;