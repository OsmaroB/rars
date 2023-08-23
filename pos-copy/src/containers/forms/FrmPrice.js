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
 } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { 
    UPDATE_PRICE,
    CLOSE_FORM_PRICE,
    ADD_PRICE,
    REMOVE_PRICE,
} from "redux/contants";
import validation from "containers/validations/ValidationPrices";

import { successMessage, warningMessage } from 'helpers/messages'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import validation from "containers/validations/ValidationProduct";
import Cookies from 'universal-cookie';

const FrmPrice = (props)=>{

    const {price, channels, subchannels, buttonDetails, optionalProducts, modifierProducts} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [priceState, setPriceState] = useState(price.price);
    const [buttonDetailID, setButtonDetailID] = useState(price.buttonDetailID);
    const [buttonDetailName, setButtonDetailName] = useState(price.buttonDetailName);
    const [channelID, setChannelID] = useState(price.channelsSubchannel.id);
    const [channelName, setChannelName] = useState(price.channelsSubchannel.name);
    const [subchannelID, setSubchannelID] = useState(price.subchannelID);
    const [subchannelName, setSubchannelName] = useState(price.subchannelName);
    const [optionalProductID, setOptionalProductID] = useState(price.optionalProductID);
    const [optionalProductName, setOptionalProductName] = useState(price.optionalProductName);
    const [modifierProductID, setModifierProductID] = useState(price.modifierProductID);
    const [modifierProductName, setModifierProductName] = useState(price.modifierProductName);

    const [checkSubchannel, setCheckSubchanner] = useState(false);
    const [showSubchannel, setShowSubchannel] = useState(true);

    const [showOptional, setShowOptional] = useState(true);
    const [showModifier, setShowModifier] = useState(true);
    const [showProduct, setShowProduct] = useState(true);

    const [dataSubChannel, setDataSubchannel] = useState({label:'', value:'', key:''})

    const [selectOptionID, setSelectOptionID] = useState('');
    const [selectOptionName, setSelectOptionName] = useState('');

    const [checkAllOptional, setCheckAllOptional] = useState(false);

    
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const dataSelectOptions = () => {
        return [
            // {
            //     label: 'Opcionales', value: 'Optionales', key:'OPT'
            // },
            {
                label: 'Agregados', value: 'Agregados', key:'MOD'
                
            },
            {
                label: 'Productos', value: 'Productos', key:'PRO'
            }
        ]
    };

    const selectChannels = () => {
        if(channels !== undefined){
            const res = channels.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const selectModifierProduct = () => {
        if(modifierProducts !== undefined){
            const res = modifierProducts.map((item)=>{
                if(item.depmodifierID != null){
                    return{label: `${item.depmodifier.name} - ${item.product.name}`, value: item.depmodifier.name, key:item.id};
                }
                if(item.submodifierID != null){
                    return{label: `${item.submodifier.name} - ${item.product.name}`, value: item.submodifier.name, key:item.id};
                }
                return{label: `${item.modifier.name} - ${item.product.name}`, value: item.modifier.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    }

    const subchannelForChannel = (value) => {
        const newList = subchannels.filter(function(element){
            return ((element.channelsSubchannel.name)).indexOf(value) !== -1;
        });
        const res = newList.map((item)=>{  
            return{label: item.name, value: item.name, key:item.id};
        })
        setDataSubchannel(res);
};

    const selectSubchannels = () => {
        if(subchannels !== undefined){
            const res = subchannels.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            setDataSubchannel(res);
        }
        setDataSubchannel({label: '', value:'', key:''});
    };

    useEffect(()=>{
        selectSubchannels();
    },[])

    const selectButtonDetails = () => {
        if(buttonDetails !== undefined){
            const res = buttonDetails.map((item)=>{
                return{label: `${item.button.name} - ${item.product.name}`, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:null, key:''}
    };


    const selectOptionalProducts = () => {
        if(optionalProducts !== undefined){
            const res = optionalProducts.map((item)=>{
                return{label: `${item.optional.name} - ${item.product.name}`, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const updateClick = () => {
        const newData = {
            ...price, 
            price: priceState,
            userUpdate:userID,
            buttonDetailID,
            channelID,
            subchannelID,
            optionalProductID,
            modifierProductID
        }
        // if(validation.update(newData)){
            dispatch({type: UPDATE_PRICE, price: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_PRICE})
        // }
    };

    const addClick = () => {
        const newData = {
            ...price, 
            price: priceState,
            buttonDetailID,
            channelID,
            subchannelID,
            optionalProductID,
            userCreate:userID,
            status: 0,
            checkSubchannel,
            selectOptionID,
            modifierProductID
        }
        if(validation.add(newData)){
            dispatch({type: ADD_PRICE, price: newData});
            console.log(newData)
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_PRICE})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...price, status:newStatus};
        dispatch({type: REMOVE_PRICE, price: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = price.status === 0 ? 1 : 0;
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


    const readInfo = () => {
        // console.log(price);
        if(price.buttonDetailID == null){
            if(price.modifierProduct.depmodifierID != null){
                return `Agregado ${price.modifierProduct.depmodifier.name} - Precio: $ ${price.price}`
            }
            if(price.modifierProduct.submodifierID != null){
                return `Agregado ${price.modifierProduct.submodifier.name} - Precio: $ ${price.price}`
            }
            return `Agregado ${price.modifierProduct.modifier.name} - Precio: $ ${price.price}`
        }
        if(price.modifierProductID == null){
            return `Producto: ${price.buttonDetail.product.name} - Precio: $ ${price.price}`  
        }
    };

    const readChannelInfo = () => {
        if(price.subchannelID == null){
            return `Canal de venta: ${price.channelsSubchannel.name}`
        }
        return `Canal de venta: ${price.channelsSubchannel.name} - ${price.subchannel.name}`
    }

    return(
        <>
            <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                        <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span className="heading-number d-inline-block mt-2 mb-2">
                                {index}
                            </span>
                            <Row>
                                <Col sm={6} md={3} lg={3}>
                                    <h3>{readInfo()}</h3>
                                    <h4>{readChannelInfo()}</h4>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={price.status === 0 ? 'theme-3' : 'light'}
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
                            color={price.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={price.status === 0? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row className="mt-3 mb-3">
                                        <Col sm="12 mt-3 mb-3">
                                            <Label>Precio</Label>
                                            <Input
                                                type="text"
                                                className="rounded"
                                                placeholder="Agregar el precio"
                                                value={priceState}
                                                onChange={(e)=>{setPriceState(e.target.value)}}
                                            />
                                        </Col>
                                        <Col sm="12 mt-3">
                                            <Label>Canales de venta</Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:channelName, value:channelID}}
                                            onChange={(e)=>{
                                                setChannelID(e.key);
                                                setChannelName(e.value);
                                                subchannelForChannel(e.value);
                                            }}
                                            options={selectChannels()}
                                            />
                                        </Col>
                                        <Col sm="12 mb-3">
                                            <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
                                                <CustomInput
                                                className="itemCheck mb-0"
                                                type="checkbox"
                                                checked={checkSubchannel}
                                                onChange={()=>{ 
                                                    if(channelName === '' || channelName === undefined){
                                                        warningMessage('', 'Selecciona un canal')
                                                    }else{
                                                        const newStatus = !checkSubchannel;
                                                        setCheckSubchanner(newStatus)
                                                        setShowSubchannel(!newStatus);
                                                    }
                                                }}
                                                label="¿Es un subcanal?"
                                                />
                                            </div>
                                        </Col>
                                        <Col sm="12 mt-3 mb-3" hidden={showSubchannel}>
                                            <Label>Subcanales de venta</Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:subchannelName, value:subchannelID}}
                                            onChange={(e)=>{
                                                setSubchannelID(e.key);
                                                setSubchannelName(e.value);
                                            }}
                                            options={dataSubChannel}
                                            />
                                        </Col>
                                        <Col sm="12 mt-3 mb-3">
                                            <Label>Opciones para asignar precio</Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:selectOptionName, value:selectOptionID}}
                                            onChange={(e)=>{
                                                setSelectOptionID(e.key);
                                                setSelectOptionName(e.value);
                                                switch (e.key) {
                                                    case 'OPT':
                                                        setShowOptional(false);
                                                        setShowProduct(true);
                                                        setShowModifier(true);
                                                        break;
                                                    case 'PRO':
                                                        setShowProduct(false);
                                                        setShowOptional(true);
                                                        setShowModifier(true);
                                                        break;
                                                    case 'MOD':
                                                        setShowModifier(false);
                                                        setShowProduct(true);
                                                        setShowOptional(true);
                                                    default:
                                                        setShowOptional(true);
                                                        setShowProduct(true);
                                                        break;
                                                }
                                            }}
                                            options={dataSelectOptions()}
                                            />
                                        </Col>
                                        <Col sm="12 mt-3 mb-3" hidden={showProduct}>
                                            <Label>Botón de producto</Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:buttonDetailName, value:buttonDetailID}}
                                            onChange={(e)=>{
                                                setButtonDetailID(e.key);
                                                setButtonDetailName(e.value);
                                            }}
                                            options={selectButtonDetails()}
                                            />
                                        </Col>
                                        <Col sm="12 mt-3 mb-3" hidden={showModifier}>
                                            <Label>Agregados</Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:modifierProductName, value:modifierProductID}}
                                            onChange={(e)=>{
                                                setModifierProductID(e.key);
                                                setModifierProductName(e.value);
                                            }}
                                            options={selectModifierProduct()}
                                            />
                                        </Col>
                                        <Col sm="12 mt-3" hidden={showOptional}>
                                            <Label>Opcionales </Label>
                                            <Select
                                            components={{ Input: CustomSelectInput }}
                                            className="react-select rounded"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            defaultValue={{label:optionalProductName, value:optionalProductID}}
                                            onChange={(e)=>{
                                                setOptionalProductID(e.key);
                                                setOptionalProductName(e.value);
                                            }}
                                            options={selectOptionalProducts()}
                                            />
                                        </Col>
                                        <Col sm="12 mb-3" hidden={showOptional}>
                                            <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
                                                <CustomInput
                                                className="itemCheck mb-0"
                                                type="checkbox"
                                                checked={checkAllOptional}
                                                onChange={()=>{ 
                                                    const newStatus = !checkAllOptional;
                                                    setCheckAllOptional(newStatus);
                                                }}
                                                label="¿Quieres asignar precio a todos los productos que tengan este opcional?"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_PRICE})}}
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

export default FrmPrice;