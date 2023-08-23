import React,{ useEffect, useState } from 'react';
import {
    Row,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmChannel from 'containers/forms/FrmChannel';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_CHANNEL } from "redux/contants";

const ListChannels = () => {

    const channels = useSelector(state => state.channels);
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(0);
    const itemsPerPage = 2;
    // finish pagination
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_CHANNEL});
    },[]);

    function NewItem(){
        if(channels.addItem){
            return(<>
                <FrmChannel 
                channel={{...channels.newItem, collapse: true}}
                index=''  
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(channels.allItems !== undefined){

            let channelsList = [];
            for (let index = from; index < from+itemsPerPage ; index++) {
                if(index<(channels.allItems).length){
                    channelsList.push(
                        <FrmChannel 
                            channel={{...channels.allItems[index], collapse:false}}
                            key={`channel-item-list-${index}`}
                            index={index+1}
                        />    
                    )
                }
            }
            // const channelsList = (channels.allItems).map((item, index)=>{
            //     return(
            //     <>
            //         <FrmChannel 
            //             channel={{...item, collapse:false}}
            //             key={item.id}
            //             index={index+1}
            //         />
            //     </>
            //     )
            // });
            return channelsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    const PaginationInPage = ()=>{
        let totalPage;
        if(channels.allItems !== undefined){
            totalPage = Math.ceil((channels.allItems).length / itemsPerPage);
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
                    setFrom(((channels.allItems).length)-itemsPerPage);
                    setUntil((channels.allItems).length);
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

export default ListChannels;