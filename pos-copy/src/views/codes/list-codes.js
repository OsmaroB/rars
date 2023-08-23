import { Colxx } from 'components/common/CustomBootstrap';
import FrmCode from 'containers/forms/FrmCode';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { GET_USER } from 'redux/contants';

const ListCodes = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_USER });
  }, []);
  function List() {
    if (users.allItems !== undefined) {
      const usersList = users.allItems.map((item, index) => {
        return (
          <>
            <FrmCode key={index}
              code={{ ...item }}
              isCollapse={false}
              index={index + 1}
            />
          </>
        );
      });
      return usersList;
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
          <List />
        </Colxx>
      </Row>
    </>
  );
};
export default ListCodes;
