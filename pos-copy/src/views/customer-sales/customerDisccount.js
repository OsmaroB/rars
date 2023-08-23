/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useMemo } from 'react';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import successMessage from 'helpers/messages';
import validation from 'containers/validations/ValidationCustomer';
import Cookies from 'universal-cookie';
import {
  SET_DISCOUNT_MODAL_CUSTOMER_SALES,
  GET_DISCOUNT,
  ADD_COUPON_DISCOUNT,
} from '../../redux/contants';

const CustomerDiscountModal = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [userID] = useState(cookies.get('userID'));

  const customerSales = useSelector((state) => state.customerSales);
  const discounts = useSelector((state) => state.discounts);
  useEffect(() => {
    dispatch({ type: GET_DISCOUNT });
  }, [dispatch]);

  const selectStatus = () => {
    const objeto = [];
    discounts.allItems.map((dis) => {
      // 1 porcentaje, 0 valor
      const tipo = dis.type === 1 ? 'Porcentaje' : 'Valor';
      objeto.push({
        label: `Nombre: ${dis.name} | Tipo : ${tipo} | Valor : ${dis.discountInfo}`,
        value: dis.id,
        key: dis.id,
      });
    });
    return objeto;
  };

  const addClick = (val) => {
      discounts.allItems.map((dis) => {
        if (dis.id === val) {
          dispatch({
            type: ADD_COUPON_DISCOUNT,
            discounts: {
              id: dis.id,
              name: dis.name,
              discountInfo: dis.discountInfo,
              type: dis.type,
              isGlobal: dis.isGlobal,
              channelID: dis.channelID,
              subchannelID: dis.subchannelID,
            },
          });
          successMessage('Cupón de descuento agregado', 'Exito');
          dispatch({
            type: SET_DISCOUNT_MODAL_CUSTOMER_SALES,
            status: !customerSales.disccountsModal,
          });
        }
      });
  };
  return (
    <>
      <Modal
        isOpen={customerSales.disccountsModal}
        size="lg"
        toggle={() => {
          dispatch({
            type: SET_DISCOUNT_MODAL_CUSTOMER_SALES,
            status: !customerSales.disccountsModal,
          });
        }}
      >
        <ModalBody>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h3>Cupones disponibles</h3>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm={12} md={12} lg={12}>
              <div className="mt-2 mb-1">
                <Label>Selecciona una opción</Label>
                {selectStatus().map((sel) => (
                  <Card key={sel.key}>
                    <CardHeader>
                      <p>
                        {sel.label}{' '}
                        <Button
                          outline
                          color="primary"
                          size="sm"
                          className="m-2"
                          onClick={() => {
                            addClick(sel.value);
                          }}
                        >
                          Seleccionar
                        </Button>
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={12} md={6} lg={3}>
              <Button
                outline
                color="primary"
                size="sm"
                onClick={() => {
                  dispatch({
                    type: SET_DISCOUNT_MODAL_CUSTOMER_SALES,
                    status: !customerSales.disccountsModal,
                  });
                }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CustomerDiscountModal;
