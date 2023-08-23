import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmSale from 'containers/forms/FrmSale';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_SALE } from "redux/contants";

const ListSales = () => {
    
    const sales = useSelector(state => state.sales);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_SALE});
    },[]);


    function List(){
        if(sales.allItems !== undefined){
            const salesList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(sales.allItems).length){
                    salesList.push(
                        <FrmSale 
                        isCollapse={{collapse: false}}
                        sale={{...sales.allItems[index]}}
                        key={`frm-sales-list-item-${index}`}
                        index={index+1}
                    />
                    )
                }
            }
            return salesList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };


    const PaginationInPage = ()=>{
        let totalPage;
        if(sales.allItems !== undefined){
            totalPage = Math.ceil((sales.allItems).length / itemsPerPage);
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
                    if(((sales.allItems).length)-itemsPerPage < 0){
                        setFrom(0);
                      }else{
                        setFrom(((sales.allItems).length)-itemsPerPage);
                      }
                    setUntil((sales.allItems).length);
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
                    <List />
                    <PaginationInPage />
                </Colxx>
            </Row>
        </>
    );
};

export default ListSales;