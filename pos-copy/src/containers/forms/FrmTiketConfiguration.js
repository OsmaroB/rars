import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
 } from 'reactstrap';
import { 
    CLOSE_FORM_TIKET_CONFIGURATION,
    ADD_TIKET_CONFIGURATION,
    UPDATE_TIKET_CONFIGURATION,
} from "redux/contants";
import { successMessage } from 'helpers/messages'
import { useDispatch } from "react-redux";
import validation from "containers/validations/ValidationEmployee";
import Cookies from 'universal-cookie';

const FrmTiketConfiguration = (props)=>{

    const {tiketConfiguration} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // element in db
    const [enterprise, setEnterprise] = useState(tiketConfiguration.enterprise);
    const [nit, setNit] = useState(tiketConfiguration.nit);
    const [item, setItem] = useState(tiketConfiguration.item);
    const [address, setAddress] = useState(tiketConfiguration.address);
    const [resolution, setResolution] = useState(tiketConfiguration.resolution);
    const [serie, setSerie] = useState(tiketConfiguration.serie);
    const [authorizationDate, setAuthorizationDate] = useState(tiketConfiguration.authorizationDate);
    const [cashRegisterNumber, setCashRegisterNumber] = useState(tiketConfiguration.cashRegisterNumber);
    const [link, setLink] = useState(tiketConfiguration.link);
    const [paragraph1, setParagraph1] = useState(tiketConfiguration.paragraph1);
    const [paragraph2, setParagraph2] = useState(tiketConfiguration.paragraph2);
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const updateClick = () => {
        const newData = {
            ...tiketConfiguration, 
            enterprise,
            nit,
            item,
            address,
            resolution,
            serie,
            authorizationDate,
            cashRegisterNumber,
            link,
            paragraph1,
            paragraph2,
            userUpdate: userID
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_TIKET_CONFIGURATION, configuration: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_TIKET_CONFIGURATION})
        }
    };

    const addClick = () => {
        const newData = {
            ...tiketConfiguration, 
            enterprise,
            nit,
            item,
            address,
            resolution,
            serie,
            authorizationDate,
            cashRegisterNumber,
            link,
            paragraph1,
            paragraph2,
            userCreate: userID
        }
        // if(validation.data(newData)){
            console.log(newData)
            dispatch({type: ADD_TIKET_CONFIGURATION, configuration: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_TIKET_CONFIGURATION})
        // }
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
                            <h3>{tiketConfiguration.enterprise}</h3>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color='theme-3'
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
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Empresa</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la empresa"
                                                    value={enterprise}
                                                    onChange={(e)=>{setEnterprise(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Giro</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el giro"
                                                    value={item}
                                                    onChange={(e)=>{setItem(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>NIT</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el NIT"
                                                    value={nit}
                                                    onChange={(e)=>{setNit(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
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
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Resolución</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la resolución"
                                                    value={resolution}
                                                    onChange={(e)=>{setResolution(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Serie</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la serie"
                                                    value={serie}
                                                    onChange={(e)=>{setSerie(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Fecha de autorización</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la fecha de autorización"
                                                    value={authorizationDate}
                                                    onChange={(e)=>{setAuthorizationDate(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Número de caja registradora</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el número de caja"
                                                    value={cashRegisterNumber}
                                                    onChange={(e)=>{setCashRegisterNumber(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Enlace</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el enlace"
                                                    value={link}
                                                    onChange={(e)=>{setLink(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={12} lg={12}>
                                            <div className="mt-3 mb-3">
                                                <Label>Parrafo 1</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el parrafo 1"
                                                    value={paragraph1}
                                                    onChange={(e)=>{setParagraph1(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={12} lg={12}>
                                            <div className="mt-3 mb-3">
                                                <Label>Parrafo 2</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar el parrafo 2"
                                                    value={paragraph2}
                                                    onChange={(e)=>{setParagraph2(e.target.value)}}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_TIKET_CONFIGURATION})}}
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

export default FrmTiketConfiguration;