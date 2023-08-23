/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Card,
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import {
  ADD_DISCOUNT,
  CLOSE_FORM_DISCOUNT,
  REMOVE_DISCOUNT,
  UPDATE_DISCOUNT,
} from 'redux/contants';
import { successMessage } from 'helpers/messages';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import validation from 'containers/validations/ValidationDiscount';
import Swal from 'sweetalert2';
import { Colxx } from 'components/common/CustomBootstrap';

const FrmDiscount = (props) => {
  const { discount, channels, subchannels } = props;
  const { index } = props;
  const { isCollapse } = props;
  const [collapse, setCollapse] = useState(isCollapse.collapse);
  const [add, setAdd] = useState(true);
  const [name, setName] = useState(discount.name);
  const [isGlobal, setIsGlobal] = useState(discount.isGlobal);
  const [type, setType] = useState(discount.type);
  const [typeName, setTypeName] = useState(discount.typeName);
  const [channelID, setChannelID] = useState(discount.channelID);
  const [channelName, setChannelName] = useState(discount.channelName);
  const [subchannelID, setSubChannelID] = useState(discount.subchannelID);
  const [subchannelName, setSubChannelName] = useState(discount.subchannelName);
  const [discountInfo, setDiscountInfo] = useState(discount.discountInfo);
  const types = [
    { name: 'Porcentaje', value: 1, id: 1 },
    { name: 'Valor', value: 0, id: 0 },
  ];
  const options = [
    { name: 'Si', value: true, id: 0 },
    { name: 'No', value: false, id: 1 },
  ];
  const selectOptions = () => {
    if (options !== undefined) {
      const opt = options.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return opt;
    }
    return { label: '', value: '', key: '' };
  };
  const selectSubChannels = () => {
    if (subchannels !== undefined) {
      const subchannelsFilter = subchannels.filter((item) => item.status === 0);
      const sub = subchannelsFilter.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return sub;
    }
    return { label: '', value: '', key: '' };
  };
  const selectChannels = () => {
    if (channels !== undefined) {
      const channelsFilter = channels.filter((item) => item.status === 0);
      const cha = channelsFilter.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return cha;
    }
    return { label: '', value: '', key: '' };
  };
  const selectTypes = () => {
    if (types !== undefined) {
      const typ = types.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return typ;
    }
    return { label: '', value: '', key: '' };
  };
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));
  const updateClick = () => {
    const newData = {
      ...discount,
      name,
      type,
      isGlobal,
      channelID,
      channelName,
      subchannelID,
      subchannelName,
      discountInfo,
      userUpdate: userID,
    };
    if (validation.update(newData)) {
      dispatch({ type: UPDATE_DISCOUNT, discount: newData });
      successMessage(
        'Envio de datos exitoso',
        'El item a sido actualizado con exito'
      );
      dispatch({ type: CLOSE_FORM_DISCOUNT });
    }
  };

  const addClick = () => {
    const newData = {
      ...discount,
      name,
      type,
      isGlobal,
      channelID,
      channelName,
      subchannelID,
      subchannelName,
      discountInfo,
      userCreate: userID,
    };
    if (validation.add({ ...newData })) {
      dispatch({ type: ADD_DISCOUNT, discount: newData });
      successMessage(
        'Envio de datos exitoso',
        'El item a sido guardado con exito'
      );
      setAdd(!add);
      dispatch({ type: CLOSE_FORM_DISCOUNT });
    }
  };
  const removeFinish = (newStatus) => {
    const newData = { ...discount, status: newStatus };
    dispatch({ type: REMOVE_DISCOUNT, discount: newData });
    successMessage(
      'Envio de datos exitoso',
      newStatus
        ? 'El item a sido reingresado con exito'
        : 'El item a sido eliminado con exito'
    );
  };
  const removeClick = () => {
    const newStatus = discount.status === 0 ? 1 : 0;
    if (newStatus === 1) {
      Swal.fire({
        title: 'Estás seguro de eliminar este item?',
        text: 'Permanecerá oculto hasta que vuelva a integrarlo a la aplicación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo eliminarlo!',
      }).then((result) => {
        if (result.isConfirmed) {
          removeFinish(newStatus);
        }
      });
    } else {
      removeFinish(newStatus);
    }
  };

  return (
    <>
      <Card className="question d-flex mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
              <span className="heading-number d-inline-block mt-2 mb-2">
                {index}
              </span>
              <h3>Descuento: {discount.name}</h3>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              title={discount.status === 0 ? 'Ocultar' : 'Mostrar'}
              color={discount.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1 view-button no-border"
            >
              <i className="simple-icon-eye" />
            </Button>

            <Button
              outline
              title="Mostrar más"
              color={discount.status === 0 ? 'theme-3' : 'light'}
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
              title={discount.status === 0 ? 'Eliminar' : 'Habilitar'}
              color={discount.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1"
              onClick={() => {
                removeClick();
              }}
            >
              <i
                className={
                  discount.status === 0
                    ? 'simple-icon-ban'
                    : 'simple-icon-check'
                }
              />
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
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Tipo</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={type}
                          onChange={(e) => {
                            setDiscountInfo(0)
                            setType(e.key);
                            setTypeName(e.value);
                          }}
                          options={selectTypes()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Canal</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{
                            label: channelName,
                            value: channelID,
                          }}
                          onChange={(e) => {
                            setChannelID(e.key);
                            setChannelName(e.value);
                          }}
                          options={selectChannels()}
                        />
                      </div>
                    </Colxx>
                    {type === 0 ? (
                      <Colxx xxs={12} xs={12} md={6} lg={6}>
                        <div className="mt-3 mb-3">
                          <Label>Descuento</Label>
                          <Input
                            type="number"
                            step={0.1}
                            className="rounded"
                            placeholder="Agregar descuento"
                            value={discountInfo}
                            onChange={(e) => {
                              setDiscountInfo(e.target.value);
                            }}
                          />
                        </div>
                      </Colxx>
                    ) : (
                      <Colxx xxs={12} xs={12} md={6} lg={6}>
                        <div className="mt-3 mb-3">
                          <Label>Descuento</Label>
                          <Input
                            type="number"
                            min={0.0}
                            max={1}
                            step={0.1}
                            className="rounded"
                            placeholder="Agregar descuento"
                            value={discountInfo}
                            onChange={(e) => {
                              setDiscountInfo(e.target.value);
                            }}
                          />
                        </div>
                      </Colxx>
                    )}
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Sub canal</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{
                            label: subchannelName,
                            value: subchannelID,
                          }}
                          onChange={(e) => {
                            setSubChannelID(e.key);
                            setSubChannelName(e.value);
                          }}
                          options={selectSubChannels()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>¿El descuento es global?</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={isGlobal}
                          onChange={(e) => {
                            setIsGlobal(e.key);
                          }}
                          options={selectOptions()}
                        />
                      </div>
                    </Colxx>
                  </Row>
                  <div className="text-right">
                    <Button
                      outline
                      color="primary"
                      className="m-1"
                      onClick={() => {
                        dispatch({ type: CLOSE_FORM_DISCOUNT });
                      }}
                    >
                      <i className="simple-icon-close btn-group-icon" />{' '}
                      Cancelar
                    </Button>
                    <Button
                      // outline
                      color="primary"
                      className="m-1"
                      onClick={() => {
                        if (add) {
                          addClick();
                        } else {
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

export default FrmDiscount;
