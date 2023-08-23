import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input,
    Row
 } from 'reactstrap';
 import Select from 'react-select';
 import CustomSelectInput from 'components/common/CustomSelectInput';
 import { Colxx } from "components/common/CustomBootstrap";
 import { useDispatch } from "react-redux";
 import { 
    CLOSE_FORM_RESTAURANT,
    UPDATE_RESTAURANT,
    ADD_RESTAURANT,
    REMOVE_RESTAURANT,
} from "redux/contants"; 
import { successMessage } from 'helpers/messages';
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationRestaurant";


const FrmRestaurant = (props)=>{

    const dispatch = useDispatch();
    const {restaurant, brands} = props;
    const {index} = props;
    const [collapse, setCollapse] = useState(restaurant.collapse);
    const [add, setAdd] = useState(true);
    const [name, setName] = useState(restaurant.name);
    const [address, setAddress] = useState(restaurant.address);
    const [brandName, setBrandName] = useState(restaurant.brandName);
    const [brandID, setBrandID] = useState(restaurant.setBrandID);

    const selectBrand = () => {
        if(brands !== undefined){
            const res = brands.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const updateClick = () => {
        const newData = {
            ...restaurant, 
            name, 
            address,
            brandName,
            brandID
        }
        if(validation.data(newData)){
            dispatch({type: UPDATE_RESTAURANT, restaurant: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_RESTAURANT})
        }
    };

    const addClick = () => {
        const newData = {
            ...restaurant, 
            name, 
            address,
            brandName,
            brandID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_RESTAURANT, restaurant: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_RESTAURANT})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...restaurant, status:newStatus};
        dispatch({type: REMOVE_RESTAURANT, restaurant: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = !(restaurant.status);
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
                            <h3>{restaurant.name}</h3>
                            <p><b>Dirección:</b> {restaurant.address}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={restaurant.status ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={restaurant.status ? 'theme-3' : 'light'}
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
                            color={restaurant.status ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={restaurant.status ? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Colxx xxs={12} xs={12} md={12} lg={12}>
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
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={12} lg={12}>
                                            <div className="mt-3 mb-3">
                                                <Label>Dirección</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la dirección"
                                                    value={address}
                                                    onChange={(e)=>{setAddress(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={12} lg={12}>
                                            <div className="mt-3 mb-3">
                                                <Label>Marca</Label>
                                                <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select rounded"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                defaultValue={{label:brandName, value:brandID}}
                                                onChange={(e)=>{
                                                    setBrandID(e.key);
                                                    setBrandName(e.value);
                                                }}
                                                options={selectBrand()}
                                                />
                                            </div>
                                        </Colxx>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_RESTAURANT})}}
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

export default FrmRestaurant;