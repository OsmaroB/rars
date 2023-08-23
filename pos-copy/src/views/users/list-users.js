/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { 
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmUser from 'containers/forms/FrmUser';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER, GET_EMPLOYEE, GET_ROLE } from 'redux/contants';

const ListUsers = () => {
  const users = useSelector((state) => state.users);
  const employees = useSelector((state) => state.employees);
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState(0);
  const [until, setUntil] = useState(0);
  const itemsPerPage = 10;
  // finish pagination

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch({ type: GET_EMPLOYEE });
    dispatch({ type: GET_ROLE });
  }, []);

  function NewItem() {
    if (users.addItem) {
      return (
        <>
          <FrmUser
            user={{ ...users.newItem }}
            index=""
            isCollapse={{ collapse: true }}
            employees={employees.allItems}
            roles={roles.allItems}
          />
        </>
      );
    }
    return <></>;
  }

  function List() {
    if (users.allItems !== undefined) {

      let usersList = [];
        for (let index = from; index < from+itemsPerPage ; index++) {
          if(index<(users.allItems).length){
              // employeeName search
            let employeeName;
            employees.allItems.map((element) => {
              if (element.id === (users.allItems[index]).employeeID) {
                employeeName = element.name;
                return null;
              }
              return null;
            });
            // rolesName search
            let roleName;
            roles.allItems.map((element) => {
              if (element.id === users.allItems[index].roleID) {
                roleName = element.name;
                return null;
              }
              return null;
            });
            usersList.push(
              <FrmUser
                user={{ ...users.allItems[index], employeeName, roleName }}
                key={`list-user-item-${index}`}
                index={index + 1}
                isCollapse={{ collapse: false }}
                employees={employees.allItems}
                roles={roles.allItems}
              />
            );
          }



        }



      // const usersList = users.allItems.map((item, index) => {
      //   // employeeName search
      //   let employeeName;
      //   employees.allItems.map((element) => {
      //     if (element.id === item.employeeID) {
      //       employeeName = element.name;
      //       return null;
      //     }
      //     return null;
      //   });
      //   // rolesName search
      //   let roleName;
      //   roles.allItems.map((element) => {
      //     if (element.id === item.roleID) {
      //       roleName = element.name;
      //       return null;
      //     }
      //     return null;
      //   });
      //   return (
      //     <>
      //       <FrmUser
      //         user={{ ...item, employeeName, roleName }}
      //         key={item.id}
      //         index={index + 1}
      //         isCollapse={{ collapse: false }}
      //         employees={employees.allItems}
      //         roles={roles.allItems}
      //       />
      //     </>
      //   );
      // });
      return usersList;
    }
    return (
      <>
        <h1>No hay lista.</h1>
      </>
    );
  }

  const PaginationInPage = ()=>{
      let totalPage;
      if(users.allItems !== undefined){
          totalPage = Math.ceil((users.allItems).length / itemsPerPage);
          return(
              <Pagination
              size="md"
              aria-label="Page navigation example"
              listClassName="justify-content-center"
            >
              <PaginationItem>
              <PaginationLink className="first" href="#" onClick={(e)=>{
                  e.preventDefault();
                  setCurrentPage(1);
                  setFrom(0);
                  setUntil(itemsPerPage);
              }}>
                  <i className="simple-icon-control-start" />
              </PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink className="prev" href="#" 
                  onClick={(e)=>{
                      e.preventDefault();
                      if(currentPage > 1){
                          setCurrentPage(currentPage-1);
                          setFrom(from-(itemsPerPage*2));
                          setFrom(from-itemsPerPage);
                      }
                  }}
              >
                  <i className="simple-icon-arrow-left" />
              </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
              <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink className="next" href="#"
              onClick={(e)=>{
                  e.preventDefault();
                  if(currentPage <totalPage){
                      setCurrentPage(currentPage+1);
                      setFrom(from+itemsPerPage);
                      setUntil(from+(itemsPerPage*2))
                  }
              }}
              >
                  <i className="simple-icon-arrow-right" />
              </PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink className="last" href="#" onClick={(e)=>{
                  e.preventDefault();
                  if(((users.allItems).length)-itemsPerPage < 0){
                    setFrom(0);
                  }else{
                    setFrom(((users.allItems).length)-itemsPerPage);
                  }
                  setCurrentPage(totalPage);
                  setUntil((users.allItems).length);
              }}>
                  <i className="simple-icon-control-end" />
              </PaginationLink>
              </PaginationItem>
          </Pagination>
          )
      }else{
          return(<></>);
      }
  }

  return (
    <>
      <Row>
        <Colxx xxs={12}>
          <NewItem />
          <List />
          <PaginationInPage />
        </Colxx>
      </Row>
    </>
  );
};

export default ListUsers;
