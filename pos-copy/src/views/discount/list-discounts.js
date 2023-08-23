/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_CHANNEL, GET_DISCOUNT, GET_SUBCHANNEL } from 'redux/contants';
import FrmDiscount from 'containers/forms/FrmDiscount';

const ListDiscounts = () => {
  const discounts = useSelector((state) => state.discounts);
  const channels = useSelector((state) => state.channels);
  const subchannels = useSelector((state) => state.subchannels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_DISCOUNT });
    dispatch({ type: GET_CHANNEL });
    dispatch({ type: GET_SUBCHANNEL });
  }, []);
  function NewItem() {
    if (discounts.addItem) {
      return (
        <>
          <FrmDiscount
            discount={{ ...discounts.newItem }}
            isCollapse={{ collapse: true }}
            channels={channels.allItems}
            subchannels={subchannels.allItems}
            index=""
          />
        </>
      );
    }
    return <></>;
  }
  function List() {
    if (discounts.allItems !== undefined) {
      const discountList = discounts.allItems.map((item, index) => {
        return (
          <>
            <FrmDiscount
              discount={{ ...item }}
              key={item.id}
              index={index + 1}
              isCollapse={{ collapse: false }}
              channels={channels.allItems}
              subchannels={subchannels.allItems}
            />
          </>
        );
      });
      return discountList;
    }
    return (
      <>
        <h1>No hay lista.</h1>
      </>
    );
  }

  return (
    <>
      <Row>
        <Colxx xxs={12}>
          <NewItem />
          <List />
        </Colxx>
      </Row>
    </>
  );
};

export default ListDiscounts;
