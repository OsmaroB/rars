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
import { Colxx } from 'components/common/CustomBootstrap';
import { 
    CLOSE_FORM_ARTICLE,
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    REMOVE_ARTICLE,
} from "redux/contants";
import { successMessage } from 'helpers/messages'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationRole";
import Cookies from 'universal-cookie';

const FrmArticle = (props)=>{

    const {article} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [name, setName] = useState(article.name);
    const [purchasingUnit, setPurchasingUnit] = useState(article.purchasing_unit);
    const [quantityPurchasingUnit, setQuantityPurchasingUnit] = useState(article.quantity_purchasing_unit);
    const [salesUnit, setSalesUnit] = useState(article.sales_unit);
    const [quantitySalesUnit, setQuantitySalesUnit] = useState(article.quantity_sales_unit);
    const [stock, setStock] = useState(article.stock);
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const updateClick = () => {
        const newData = {
            ...article, 
            name,
            purchasing_unit: purchasingUnit,
            quantity_purchasing_unit: quantityPurchasingUnit,
            sales_unit: salesUnit,
            quantity_sales_unit: quantitySalesUnit,
            stock,
            userUpdate: userID
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_ARTICLE, article: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_ARTICLE})
        }
    };

    const addClick = () => {
        const newData = {
            ...article, 
            name,
            purchasing_unit: purchasingUnit,
            quantity_purchasing_unit: quantityPurchasingUnit,
            sales_unit: salesUnit,
            quantity_sales_unit: quantitySalesUnit,
            stock,
            userCreate: userID
        }
        if(validation.data(newData)){
            dispatch({type: ADD_ARTICLE, article: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_ARTICLE})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...article, status:newStatus};
        dispatch({type: REMOVE_ARTICLE, article: newData});
        successMessage('Envio de datos exitoso', newStatus === 0 ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = article.status === 0 ? 1 : 0;
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
                            <h3>{article.name}</h3>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={article.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={article.status === 0 ? 'theme-3' : 'light'}
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
                            color={article.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={article.status === 0? 'simple-icon-ban' : 'simple-icon-check'} />
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
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Unidad de compra</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la unidad de compra"
                                                    value={purchasingUnit}
                                                    onChange={(e)=>{setPurchasingUnit(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Cantidad de unidad de compra</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la cantidad de unidad de compra"
                                                    value={quantityPurchasingUnit}
                                                    onChange={(e)=>{setQuantityPurchasingUnit(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx> 
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Unidad de venta</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la unidad de venta"
                                                    value={salesUnit}
                                                    onChange={(e)=>{setSalesUnit(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Cantidad de unidad de venta</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la candidad de unidad de venta"
                                                    value={quantitySalesUnit}
                                                    onChange={(e)=>{setQuantitySalesUnit(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Stock (Inventario de artículo)</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar stock de artículo"
                                                    value={stock}
                                                    onChange={(e)=>{setStock(e.target.value)}}
                                                />
                                            </div>
                                        </Colxx>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_ARTICLE})}}
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

export default FrmArticle;