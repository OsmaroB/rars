/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
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
} from 'reactstrap';
import { successMessage } from 'helpers/messages';
import { useDispatch } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import {
  ADD_USER,
  CLOSE_FORM_USER,
  REMOVE_USER,
  UPDATE_USER,
} from 'redux/contants';
import Swal from 'sweetalert2';
import validation from 'containers/validations/ValidationUser';
import Cookies from 'universal-cookie';

const FrmUser = (props) => {
  const { user, employees, roles } = props;
  const { index } = props;
  const { isCollapse } = props;
  const [collapse, setCollapse] = useState(isCollapse.collapse);
  const [add, setAdd] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [confirmPass, setConfirmPass] = useState(user.password);
  const [roleName, setRoleName] = useState(user.roleName);
  const [roleID, setRoleID] = useState(user.roleID);
  const [employeeName, setEmployeeName] = useState(user.employeeName);
  const [employeeID, setEmployeeID] = useState(user.employeeID);

  const selectRoles = () => {
    if (roles !== undefined) {
      const res = roles.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return res;
    }
    return { label: '', value: '', key: '' };
  };

  const selectEmployees = () => {
    if (employees !== undefined) {
      const res = employees.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return res;
    }
    return { label: '', value: '', key: '' };
  };

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [userID] = useState(cookies.get('userID'));

  const updateClick = () => {
    const newData = {
      ...user,
      email,
      roleName,
      employeeName,
      password,
      roleID,
      employeeID,
      userUpdate: userID,
    };
    if (validation.update(newData)) {
      dispatch({ type: UPDATE_USER, user: newData });
      dispatch({ type: CLOSE_FORM_USER });
    }
  };

  const addClick = () => {
    const newData = {
      ...user,
      email,
      roleName,
      employeeName,
      password,
      roleID,
      employeeID,
      userCreate: userID,
    };
    if (validation.add({ ...newData, confirmPass })) {
      dispatch({ type: ADD_USER, user: newData });
      setAdd(!add);
      dispatch({ type: CLOSE_FORM_USER });
    }
  };

  const removeFinish = (newStatus) => {
    const newData = { ...user, status: newStatus };
    dispatch({ type: REMOVE_USER, user: newData });
    successMessage(
      'Envio de datos exitoso',
      newStatus
        ? 'El item a sido reingresado con exito'
        : 'El item a sido eliminado con exito'
    );
  };

  const removeClick = () => {
    const newStatus = user.status === 0 ? 1 : 0;
    if (newStatus === 1) {
      Swal.fire({
        title: 'Estás seguro de eliminar este item',
        text: 'Permanecera oculto hasta que vuelva a integrarlo a la aplicación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si deseo eliminarlo',
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
              <h3>Usuario: {user.email}</h3>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color={user.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1 view-button no-border"
            >
              <i className="simple-icon-eye" />
            </Button>

            <Button
              outline
              color={user.status === 0 ? 'theme-3' : 'light'}
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
              color={user.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1"
              onClick={() => {
                removeClick();
              }}
            >
              <i
                className={
                  user.status === 0 ? 'simple-icon-ban' : 'simple-icon-check'
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
                        <Label>Email</Label>
                        <Input
                          type="email"
                          className="rounded"
                          placeholder="Agregar la descripción"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Roles</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{ label: roleName, value: roleID }}
                          onChange={(e) => {
                            setRoleID(e.key);
                            setRoleName(e.value);
                          }}
                          options={selectRoles()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Empleados</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{
                            label: employeeName,
                            value: employeeID,
                          }}
                          onChange={(e) => {
                            setEmployeeID(e.key);
                            setEmployeeName(e.value);
                          }}
                          options={selectEmployees()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div
                        className="mt-3 mb-3"
                        style={add ? { display: 'block' } : { display: 'none' }}
                      >
                        <Label>Contraseña</Label>
                        <Input
                          type="password"
                          className="rounded"
                          placeholder="Agregar la descripción"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div
                        className="mt-3 mb-3"
                        style={add ? { display: 'block' } : { display: 'none' }}
                      >
                        <Label>Confirmar contraseña</Label>
                        <Input
                          type="password"
                          className="rounded"
                          placeholder="Agregar la descripción"
                          value={confirmPass}
                          onChange={(e) => {
                            setConfirmPass(e.target.value);
                          }}
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
                        dispatch({ type: CLOSE_FORM_USER });
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

export default FrmUser;
