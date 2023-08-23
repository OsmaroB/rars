import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmPrice from 'containers/forms/FrmPrice';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_PRICE, GET_CHANNEL, GET_SUBCHANNEL, GET_OPTIONAL_PRODUCT, GET_BUTTON_DETAIL, GET_MODIFIER_PRODUCT } from "redux/contants";

const ListPrice = () => {

    const prices = useSelector(state => state.prices);
    const buttonDetails = useSelector(state => state.buttonDetails);
    const channels = useSelector(state => state.channels);
    const subchannels = useSelector(state => state.subchannels);
    const optionalProducts = useSelector(state => state.optionalProducts);
    const modifierProducts = useSelector(state => state.modifierProducts);
    const dispatch = useDispatch();

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_PRICE});
        dispatch({type: GET_CHANNEL});
        dispatch({type: GET_SUBCHANNEL});
        dispatch({type: GET_OPTIONAL_PRODUCT});
        dispatch({type: GET_BUTTON_DETAIL});
        dispatch({type: GET_MODIFIER_PRODUCT});
    },[]);

    function NewItem(){
        if(prices.addItem){
            return(<>
                <FrmPrice 
                price={{...prices.newItem}}
                buttonDetails={buttonDetails.allItems}
                channels={channels.allItems}
                subchannels={subchannels.allItems}
                optionalProducts={optionalProducts.allItems}
                modifierProducts={modifierProducts.allItems}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(prices.allItems !== undefined){


            let pricesList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(prices.allItems).length){
                    pricesList.push(
                        <FrmPrice 
                            isCollapse={{collapse: false}}
                            price={{...prices.allItems[index]}}
                            buttonDetails={buttonDetails.allItems}
                            channels={channels.allItems}
                            subchannels={subchannels.allItems}
                            optionalProducts={optionalProducts.allItems}
                            modifierProducts={modifierProducts.allItems}
                            key={`prices-elements-list-${index}`}
                            index={index+1}
                        />
                    )
                }
            }

            // const pricesList = (prices.allItems).map((item, index)=>{
                
            // });
            return pricesList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(prices.allItems !== undefined){
            totalPage = Math.ceil((prices.allItems).length / itemsPerPage);
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
                    setFrom(((prices.allItems).length)-itemsPerPage);
                    setUntil((prices.allItems).length);
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

export default ListPrice;