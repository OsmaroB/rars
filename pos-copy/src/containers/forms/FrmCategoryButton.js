/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Card,
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { successMessage } from 'helpers/messages';
import { useDispatch } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import {
  ADD_CATEGORY_BUTTON,
  CLOSE_FORM_CATEGORY_BUTTON,
  REMOVE_CATEGORY_BUTTON,
  UPDATE_CATEGORY_BUTTON,
} from 'redux/contants';
import Swal from 'sweetalert2';
import validation from 'containers/validations/ValidationCategoryButton';
import Cookies from 'universal-cookie';
import { DatePicker } from 'reactstrap-date-picker';

const FrmCategoryButton = (props) => {
  const { categoryButton, buttons, categories } = props;
  const { index } = props;
  const { isCollapse } = props;
  const [collapse, setCollapse] = useState(isCollapse.collapse);
  const [add, setAdd] = useState(true);
  const Xmas95 = new Date(categoryButton.specificDate);
  const weekday = Xmas95.getDay();
  console.log(weekday); // 1
  console.log(categoryButton.specificDate);
  const [datevalue, setDateValue] = useState(null);
  const [datevalue1, setDateValue1] = useState(null);
  const [fmtValue, setFmtValue] = useState(null);
  const [fmtValue1, setFmtValue1] = useState(null);
  let arr = [];
  const handleChange = (datevalueSelected, formattedValue) => {
    setDateValue(datevalueSelected);
    setFmtValue(formattedValue);
  };
  const handleChange1 = (datevalueSelected, formattedValue) => {
    setDateValue1(datevalueSelected);
    setFmtValue1(formattedValue);
  };
  const days = () => [
    { key: 0, label: 'Lunes', value: 0 },
    { key: 1, label: 'Martes', value: 1 },
    { key: 2, label: 'Miercoles', value: 2 },
    { key: 3, label: 'Jueves', value: 3 },
    { key: 4, label: 'Viernes', value: 4 },
    { key: 5, label: 'Sabado', value: 5 },
    { key: 6, label: 'Domingo', value: 6 },
  ];
  //
  const [buttonName, setButtonName] = useState(categoryButton.button.name);
  const [buttonID, setButtonID] = useState(categoryButton.button.id);
  const [categoryName, setCategoryName] = useState(
    categoryButton.category.name
  );
  const [categoryID, setCategoryID] = useState(categoryButton.category.id);

  const selectButtons = () => {
    if (buttons !== undefined) {
      const res = buttons.map((item) => {
        return { label: item.name, value: item.name, key: item.id };
      });
      return res;
    }
    return { label: '', value: '', key: '' };
  };

  const selectCategories = () => {
    if (categories !== undefined) {
      const res = categories.map((item) => {
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
    let days = null;
    if (arr.length != 0) {
      days = arr.toString();
    }
    arr = [];
    const newData = {
      ...categoryButton,
      buttonID,
      buttonName,
      categoryID,
      days,
      specificDate: fmtValue,
      untilDate: fmtValue1,
      categoryName,
      userUpdate: userID,
      button: {
        name: buttonName,
      },
      category: {
        name: categoryName,
      },
    };
    if (validation.update(newData)) {
      dispatch({ type: UPDATE_CATEGORY_BUTTON, categoryButton: newData });
      successMessage(
        'Envio de datos exitoso',
        'El item a sido actualizado con exito'
      );
      dispatch({ type: CLOSE_FORM_CATEGORY_BUTTON });
    }
  };

  const addClick = () => {
    let days = null;
    if (arr.length != 0) {
      days = arr.toString();
    }
    arr = [];
    const newData = {
      ...categoryButton,
      buttonID,
      buttonName,
      categoryID,
      categoryName,
      days,
      specificDate: fmtValue,
      untilDate: fmtValue1,
      button: {
        name: buttonName,
      },
      category: {
        name: categoryName,
      },
      userCreate: userID,
    };
    if (validation.add({ newData })) {
      dispatch({ type: ADD_CATEGORY_BUTTON, categoryButton: newData });
      successMessage(
        'Envio de datos exitoso',
        'El item a sido guardado con exito'
      );
      setAdd(!add);
      dispatch({ type: CLOSE_FORM_CATEGORY_BUTTON });
    }
  };

  const removeFinish = (newStatus) => {
    const newData = { ...categoryButton, status: newStatus };
    dispatch({ type: REMOVE_CATEGORY_BUTTON, categoryButton: newData });
    successMessage(
      'Envio de datos exitoso',
      newStatus
        ? 'El item a sido reingresado con exito'
        : 'El item a sido eliminado con exito'
    );
  };

  const removeClick = () => {
    const newStatus = categoryButton.status === 0 ? 1 : 0;
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
              <h3>
                <b>Botón: {categoryButton.button.name}</b>
              </h3>
              <h3>Categoría: {categoryButton.category.name}</h3>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color={categoryButton.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1 view-button no-border"
            >
              <i className="simple-icon-eye" />
            </Button>

            <Button
              outline
              color={categoryButton.status === 0 ? 'theme-3' : 'light'}
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
              color={categoryButton.status === 0 ? 'theme-3' : 'light'}
              className="icon-button ml-1"
              onClick={() => {
                removeClick();
              }}
            >
              <i
                className={
                  categoryButton.status === 0
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
                        <Label>Botón</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{ label: buttonName, value: buttonID }}
                          onChange={(e) => {
                            setButtonID(e.key);
                            setButtonName(e.value);
                          }}
                          options={selectButtons()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Categorías</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          defaultValue={{
                            label: categoryName,
                            value: categoryID,
                          }}
                          onChange={(e) => {
                            setCategoryID(e.key);
                            setCategoryName(e.value);
                          }}
                          options={selectCategories()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-3 mb-3">
                        <Label>Días visibles</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select rounded"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          isMulti
                          onChange={(e) => {
                            arr = [];
                            e.map((x) => {
                              arr.push(x.value);
                            });
                          }}
                          options={days()}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-2 mb-2">
                        <Label>Visible solo</Label>
                        <DatePicker
                          id="example-datepicker"
                          autoComplete="off"
                          value={datevalue}
                          dateFormat="YYYY-MM-DD"
                          placeholder="Ingresa la fecha"
                          onChange={(v, f) => handleChange(v, f)}
                        />
                      </div>
                    </Colxx>
                    <Colxx xxs={12} xs={12} md={6} lg={6}>
                      <div className="mt-2 mb-2">
                        <Label>Visible hasta</Label>
                        <DatePicker
                          autoComplete="off"
                          id="example-datepicker"
                          value={datevalue1}
                          dateFormat="YYYY-MM-DD"
                          placeholder="Ingresa la fecha"
                          onChange={(v, f) => handleChange1(v, f)}
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
                        dispatch({ type: CLOSE_FORM_CATEGORY_BUTTON });
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

export default FrmCategoryButton;
