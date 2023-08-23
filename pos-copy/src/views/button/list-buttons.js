import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
// import FrmButton from 'containers/forms/FrmButton';
import FrmButton from 'containers/forms/FrmButton'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_BUTTON } from "redux/contants";

const ListButton = () => {

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination

    useEffect(()=>{
        dispatch({type: GET_BUTTON});
    },[]);

    function NewItem(){
        if(buttons.addItem){
            return(<>
                <FrmButton 
                button={{...buttons.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(buttons.allItems !== undefined){

            let buttonsList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(buttons.allItems).length){
                    buttonsList.push(
                        <FrmButton 
                        isCollapse={{collapse: false}}
                        button={{...buttons.allItems[index]}}
                        key={`list-buttons-item-${index}`}
                        index={index+1}
                    />   
                    )
                }
            }

            // const buttonsList = (buttons.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmButton 
            //             isCollapse={{collapse: false}}
            //             button={{...item}}
            //             key={item.id}
            //             index={index+1}
            //         />
            //     </>
            //     )
            // });
            return buttonsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(buttons.allItems !== undefined){
            totalPage = Math.ceil((buttons.allItems).length / itemsPerPage);
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
                    setFrom(((buttons.allItems).length)-itemsPerPage);
                    setUntil((buttons.allItems).length);
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

export default ListButton;