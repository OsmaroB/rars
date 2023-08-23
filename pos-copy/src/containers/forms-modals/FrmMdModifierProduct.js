import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GET_MODIFIER_PRODUCT,
    GET_PRODUCT,
    ADD_MODIFIER_PRODUCT,
    REMOVE_MODIFIER_PRODUCT
} from "redux/contants";
import {
    Col,
    Row,
    Card,
    CardBody,
    Button,
    Container,
    Label,
    Form,
    FormGroup
} from'reactstrap';
import { successMessage } from 'helpers/messages'
import Select from 'react-select';
 import CustomSelectInput from 'components/common/CustomSelectInput';
 import Swal from "sweetalert2";
// import validation from "containers/validations/ValidationOptional";
import Cookies from 'universal-cookie';

const FrmMdModifierProduct = (props) => {

    const {
        modifier,
        submodifier,
        depmodifier
    } = props;

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID'));     
    const modifierProducts = useSelector(state => state.modifierProducts);
    const products = useSelector(state => state.products);
    const [addProduct, setAddProduct] = useState(false);
    const [productName, setProductName] = useState(modifierProducts.productName);
    const [productID, setProductID] = useState(modifierProducts.productID);


    useEffect(()=>{
        dispatch({type: GET_MODIFIER_PRODUCT});
        dispatch({type: GET_PRODUCT});
    },[]);


    const selectProduct = () => {
        if(products !== undefined){
            const res = (products.allItems).map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const Tree = () => {
        if(submodifier == null && depmodifier == null){
            
            return(
                <Card className="m-3">
                    <CardBody>
                        <h1>Agregado</h1>
                       <h3>{modifier.name}</h3> 
                    </CardBody>
                </Card>
            )
        }
        return(<>
        </>);
    };

    const removeFinish = (newStatus, id) => {
        const newData = {
            id,
            modifierID: modifier.id,
            userCreate:userID,
            status:newStatus};
        dispatch({type: REMOVE_MODIFIER_PRODUCT, modifierProduct: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = (status, id) => {
        const newStatus = status === 0 ? 1 : 0;
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
                    removeFinish(newStatus, id);
                }
            })
        }else{
            removeFinish(newStatus, id);
        }
    };


    const FrmAsignProduct = () => {
        return(<>
            <Row  hidden={!addProduct}>
                <Col sm={12} md={12} lg={12}>
                    <Form>
                        <FormGroup>
                            <Row className="mb-4">
                                <Col sm={12} md={12} lg={12}>
                                    <div className="mt-3 mb-3">
                                        <Label>Roles</Label>
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
                                            options={selectProduct()}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-right">
                                <Button
                                    outline
                                    color="primary"
                                    className="m-1"
                                    onClick={()=>{
                                        setAddProduct(!addProduct);
                                    }}
                                >
                                    <i className="simple-icon-close btn-group-icon" /> Cancelar
                                </Button>
                                <Button
                                    // outline
                                    color="primary"
                                    size="sm"
                                    className="m-1"
                                    onClick={()=>{
                                        if(submodifier == null && depmodifier == null){
                                            const newData = {
                                                modifierID: modifier.id,
                                                submodifierID: null,
                                                depmodifierID: null,
                                                productID: productID,
                                                userCreate:userID
                                            }
                                            dispatch({type: ADD_MODIFIER_PRODUCT, modifierProduct: newData});
                                        }
                                    }}
                                >
                                    <i className="simple-icon-plus btn-group-icon" /> Guardar
                                </Button>
                            </div>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>);
    };

    const Products = () => {
        if(modifierProducts.allItems != null || modifierProducts.allItems != ""){
            const listFilter = (modifierProducts.allItems).filter((modifierProduct)=>{
                return  modifierProduct.modifierID == modifier.id
            });
            if(listFilter.length <=0){
                return(<>
                    <h3>
                        No hay ningun Agregado asignado actualmente. 
                        <Button
                            // outline
                            color="primary"
                            className="m-1"
                            onClick={()=>{
                                console.log('agregando')
                                setAddProduct(!addProduct);
                            }}
                        >
                            <i className="simple-icon-plus btn-group-icon" /> Agregar
                        </Button>
                    </h3>
                    <Container>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <FrmAsignProduct/>
                            </Col>
                        </Row>
                    </Container>
                </>)
            }
            return(<>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        {listFilter.map((productModifier)=>{
                            return(
                                <>
                                    <h3>
                                        - {productModifier.product.name}
                                        <Button
                                            // outline
                                            color="secondary"
                                            size='sm'
                                            className="m-1"
                                            onClick={()=>{
                                                removeClick(productModifier.status, productModifier.id);
                                            }}
                                        >
                                            <i className="simple-icon-plus btn-group-icon" /> {productModifier.status === 0 ? 'Deshabilitar' : 'Habilitar'}
                                        </Button>
                                    </h3>
                                </>
                            )
                        })}
                    </Col>
                    <Col ms={12} md={12} lg={12}>
                        <Button
                            // outline
                            color="primary"
                            className="m-1"
                            onClick={()=>{
                                setAddProduct(!addProduct);
                            }}
                        >
                            <i className="simple-icon-plus btn-group-icon" /> Agregar
                        </Button>
                        <Container>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <FrmAsignProduct/>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                </Row>
            </>)
        }
        return(<>

        </>);
    };


    return(<>
        <Tree />
        <Card className="m-3">
            <CardBody>
                <h1>Productos que tienen este Agregado asignado</h1>
                <Products />
            </CardBody>
        </Card>
    </>);
};

export default FrmMdModifierProduct;