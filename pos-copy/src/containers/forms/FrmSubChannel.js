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
    ADD_SUBCHANNEL,
    CLOSE_FORM_SUBCHANNEL,
    REMOVE_SUBCHANNEL,
    UPDATE_SUBCHANNEL,
} from "redux/contants";
import { successMessage } from 'helpers/messages';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationSubChannel";


const FrmSubChannel = (props)=>{

    const {subchannel, channels} = props;
    const {index} = props;
    const [collapse, setCollapse] = useState(subchannel.collapse);
    const [add, setAdd] = useState(true);
    const [name, setName] = useState(subchannel.name);
    const [channelID, setChannelID] = useState(subchannel.channelsSubchannel.id);
    const [channelName, setChannelName] = useState(subchannel.channelsSubchannel.name);

    const selectData = () => {
        if(channels !== undefined){
            const resFilter = channels.filter(item => item.status === 0);
            const res = resFilter.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };
    const dispatch = useDispatch();

    const updateClick = () => {
        const newData = {
            ...subchannel, 
            name, 
            channelID, 
            channelName,
            channel:{
                name:channelName
            },
        }
        if(validation.data(newData)){
            dispatch({type: UPDATE_SUBCHANNEL, subchannel: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_SUBCHANNEL})
        }
    };

    const addClick = () => {
        const newData = {
            ...subchannel, 
            name, 
            channelID, 
            channelName,
            channel:{
                name:channelName
            },
        }
        if(validation.data(newData)){
            dispatch({type: ADD_SUBCHANNEL, subchannel: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_SUBCHANNEL})
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...subchannel, status:newStatus};
        dispatch({type: REMOVE_SUBCHANNEL, subchannel: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = subchannel.status === 0 ? 1 : 0;
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
                            <h3>{subchannel.name}</h3>
                            <p>{subchannel.description}</p>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={subchannel.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={subchannel.status === 0 ? 'theme-3' : 'light'}
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
                            color={subchannel.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={subchannel.status ? 'simple-icon-ban' : 'simple-icon-check'} />
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
                                        <Label>Canal de venta</Label>
                                        <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select rounded"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        defaultValue={{label:channelName, value:channelID}}
                                        onChange={(e)=>{
                                            setChannelID(e.key);
                                            setChannelName(e.value);
                                        }}
                                        options={selectData()}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_SUBCHANNEL})}}
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

export default FrmSubChannel;