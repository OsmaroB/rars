import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmModifier from 'containers/forms/FrmModifier';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_MODIFIER } from "redux/contants";

const ListModifiers = () => {

    const modifiers = useSelector(state => state.modifiers);
    const dispatch = useDispatch();
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 10;
    // finish pagination


    useEffect(()=>{
        dispatch({type: GET_MODIFIER});
    },[]);

    function NewItem(){
        if(modifiers.addItem){
            console.log({...modifiers.newItem})
            return(<>
                <FrmModifier 
                modifier={{...modifiers.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(modifiers.allItems !== undefined){
            let modifiersList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(modifiers.allItems).length){
                    modifiersList.push(
                        <FrmModifier 
                            isCollapse={{collapse: false}}
                            modifier={{...modifiers.allItems[index]}}
                            key={`modifier-list-item-${index}`}
                            index={index+1}
                        /> 
                    )
                }
            }
            // const modifiersList = (modifiers.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmModifier 
            //             isCollapse={{collapse: false}}
            //             modifier={{...item}}
            //             key={item.id}
            //             index={index+1}
            //         />
            //     </>
            //     )
            // });
            return modifiersList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(modifiers.allItems !== undefined){
            totalPage = Math.ceil((modifiers.allItems).length / itemsPerPage);
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
                    setFrom(((modifiers.allItems).length)-itemsPerPage);
                    setUntil((modifiers.allItems).length);
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

export default ListModifiers;