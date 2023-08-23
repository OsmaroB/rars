import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmEmployee from 'containers/forms/FrmEmployee';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_EMPLOYEE } from "redux/contants";

const ListEmployees = () => {

    const employees = useSelector(state => state.employees);
    // const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_EMPLOYEE});
    },[]);

    function NewItem(){
        if(employees.addItem){
            return(<>
                <FrmEmployee 
                employee={{...employees.newItem}}
                isCollapse={{collapse: true}}
                key={`frm-employees-new-item`}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(employees.allItems !== undefined){

            let employeesList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(employees.allItems).length){
                    employeesList.push(
                        <FrmEmployee 
                            isCollapse={{collapse: false}}
                            employee={{...employees.allItems[index]}}
                            key={`frm-employees-list-${index}`}
                            index={index+1}
                        />   
                    )
                }
            }
            return employeesList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(employees.allItems !== undefined){
            totalPage = Math.ceil((employees.allItems).length / itemsPerPage);
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
                    setCurrentPage(totalPage);
                    if(((employees.allItems).length)-itemsPerPage < 0){
                        setFrom(0);
                      }else{
                        setFrom(((employees.allItems).length)-itemsPerPage);
                      }
                    setUntil((employees.allItems).length);
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

    return(
        <>
            <Row>
                <Colxx xxs={12}>
                    <NewItem key="new-item-employee"/>
                    <List key="listEmployee"/>
                    <PaginationInPage />
                </Colxx>
            </Row>
        </>
    );
};

export default ListEmployees;