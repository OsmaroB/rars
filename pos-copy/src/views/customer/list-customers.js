import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
// import FrmUser from 'containers/forms/FrmUser';
import FrmCustomer from 'containers/forms/FrmCustomer';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_CUSTOMER } from "redux/contants";

const ListCustomers = () => {

    const customers = useSelector(state => state.customers);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_CUSTOMER});
    },[]);

    function NewItem(){
        if(customers.addItem){
            return(<>
                <FrmCustomer 
                    customer={{...customers.newItem, collapse: true}}
                    index=''  
                    add={true}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(customers.allItems !== undefined){


            let customersList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(customers.allItems).length){
                    customersList.push(
                        <FrmCustomer 
                            customer={{...customers.allItems[index], collapse:false}}
                            key={`customer-list-item-${index}`}
                            index={index+1}
                            add={false}
                        />
                    )
                }
            }
            return customersList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(customers.allItems !== undefined){
            totalPage = Math.ceil((customers.allItems).length / itemsPerPage);
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
                    if(((customers.allItems).length)-itemsPerPage < 0){
                        setFrom(0);
                    }else{
                        setFrom(((customers.allItems).length)-itemsPerPage);
                    }
                    setUntil((customers.allItems).length);
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
                    <NewItem />
                    <List />
                    <PaginationInPage />
                </Colxx>
            </Row>
        </>
    );
};

export default ListCustomers;