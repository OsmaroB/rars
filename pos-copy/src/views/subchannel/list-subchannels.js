import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmSubChannel from 'containers/forms/FrmSubChannel';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_SUBCHANNEL, GET_CHANNEL } from "redux/contants";

const ListSubChannels = () => {

    const subchannels = useSelector(state => state.subchannels);
    const channels = useSelector(state => state.channels);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_SUBCHANNEL});
        dispatch({type: GET_CHANNEL});
    },[]);

    function NewItem(){
        if(subchannels.addItem){
            return(<>
                <FrmSubChannel 
                subchannel={{...subchannels.newItem, collapse: true}}
                index=''  
                channels={channels.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(subchannels.allItems !== undefined){
            const subChannelsList = (subchannels.allItems).map((item, index)=>{
                return(
                <>
                    <FrmSubChannel 
                        subchannel={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                        channels={channels.allItems}
                    />
                </>
                )
            });
            return subChannelsList;
        }
        return(
            <><h1>No hay lista.</h1></>
        )
    };

    return(
        <>
            <Row>
                <Colxx xxs={12}>
                    <NewItem />
                    <List />
                </Colxx>
            </Row>
        </>
    );
};

export default ListSubChannels;