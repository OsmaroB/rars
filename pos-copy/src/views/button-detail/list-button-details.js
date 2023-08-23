import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmButtonDetail from 'containers/forms/FrmButtonDetail';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_BUTTON, GET_BUTTON_DETAIL, GET_PRODUCT } from "redux/contants";

const ListButtonDetails = () => {

    const buttonDetails = useSelector(state => state.buttonDetails);
    const buttons = useSelector(state => state.buttons);
    const products = useSelector(state => state.products);
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_BUTTON});
        dispatch({type: GET_PRODUCT});
        dispatch({type: GET_BUTTON_DETAIL});
    },[]);

    function NewItem(){
        if(buttonDetails.addItem){
            return(<>
                <FrmButtonDetail 
                    buttonDetail={{...buttonDetails.newItem}}
                    index=''  
                    isCollapse={{collapse: true}}
                    buttons={buttons.allItems}
                    products={products.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(buttonDetails.allItems !== undefined){

            let buttonDetailsList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(buttonDetails.allItems).length){
                    buttonDetailsList.push(
                        <FrmButtonDetail 
                            buttonDetail={{...buttonDetails.allItems[index]}}
                            key={`list-button-detail-item-${index}`}
                            index={index+1}
                            isCollapse={{collapse: false}}
                            buttons={buttons.allItems}
                            products={products.allItems}
                        />
                    )
                }
            }

            // const buttonDetailsList = (buttonDetails.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmButtonDetail 
            //             buttonDetail={{...item}}
            //             key={item.id}
            //             index={index+1}
            //             isCollapse={{collapse: false}}
            //             buttons={buttons.allItems}
            //             products={products.allItems}
            //         />
            //     </>
            //     )
            // });
            return buttonDetailsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(buttonDetails.allItems !== undefined){
            totalPage = Math.ceil((buttonDetails.allItems).length / itemsPerPage);
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
                    setFrom(((buttonDetails.allItems).length)-itemsPerPage);
                    setUntil((buttonDetails.allItems).length);
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

export default ListButtonDetails;