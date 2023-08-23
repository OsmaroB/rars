import React, {useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    Row,
    Button,
    Card,
    CardBody
  } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import GlideComponent from 'components/carousel/GlideComponent';
import { 
    GET_CHANNEL, 
    GET_SUBCHANNEL, 
    CUSTOMER_SALES_CHANGE_CHANNEL, 
    SET_STATUS_ORDER_CUSTOMER_SALES, 
    GET_ALL_CUSTOMER_SALES, 
    GET_CHANNEL_CUSTOMER_DETAIL, 
    GET_PRICES_FOR_CHANNEL_AND_CATEGORY, 
} from '../../redux/contants';
import ListSubchannel from "./list-subchannel";
import Swal from "sweetalert2";
import './style.css';

const ListChannels = (props) => {
    const {hidden} = props;
    // states in redux-saga
    const channels = useSelector(state => state.channels);
    const subchannels = useSelector(state => state.subchannels);
    const customerSales = useSelector(state => state.customerSales);
    const dispatch = useDispatch();
    const chWithSubch = [];
    const [state, setState] = useState(1);
    const [newCha, setNewCha] = useState(null);
    // useStates

    function chWhitoutSubch(allCh, subCh){
        const channelsArray = subCh.map((channel)=>{
            return channel.channelsSubchannel
        })
        const channelsFiltereds = [];
        allCh.forEach((chn)=>{
            let repeat = 0;
            channelsArray.forEach((chnSub)=>{
                if(chn.mask === chnSub.mask){
                    repeat = repeat + 1;
                }
            });
            if(repeat === 0){
                channelsFiltereds.push(chn)
            }
        })
        return channelsFiltereds;
    }
    
    function ListSubChannels(){
        if(subchannels.allItems !== null || subchannels.allItems !== ''){
            const subchannelActive = subchannels.allItems.filter((subchannel)=>{
                return subchannel.status == 0;
            })
            subchannelActive.forEach((item)=>{
                if(chWithSubch.length === 0){
                    chWithSubch.push(item.channelsSubchannel)
                }
                else{
                    const newList = chWithSubch.filter((element)=>{
                        return item.channelID == element.id;
                    });
                    if(newList.length == 0){
                        chWithSubch.push(item.channelsSubchannel);
                    }
                }
            });
            if(chWithSubch.length > 0){    
                setNewCha(chWithSubch);
            }else{
                setState(state + 1);
            }
        }else{
            setState(state + 1);
        }
    }

    useEffect(()=>{
        dispatch({type: GET_CHANNEL});
        dispatch({type: GET_SUBCHANNEL});
        dispatch({type: GET_CHANNEL_CUSTOMER_DETAIL});
        ListSubChannels();
    },[state, dispatch]);

    function NewList(){
        if(newCha !== null){
            const list = newCha.map((channel, index)=>{
                return(
                    // <div className="glide-item">
                        <ListSubchannel 
                            selected={customerSales.channelSelectedID == channel.id? true: false}
                            key={`listch-${index}`} 
                            channel={channel}
                            subchannels={subchannels}
                        />
                    // </div>
                )
            })
            return list;
        }
        return(<></>);
    }

    function Channels(){
        if(channels.allItems !== null || channels.allItems !== ''){
            if(subchannels.allItems !== null || subchannels.allItems !== ''){
                const newChannels = chWhitoutSubch(channels.allItems, subchannels.allItems);
                const listFilterStatus = newChannels.filter((channel)=>{
                    return channel.status == 0;
                })
                const list = listFilterStatus.map((item)=>{
                    return(
                            <Button key={`btn-ch-${item.id}`}
                            color="primary"
                            className={`btn btn-sm mx-1 mt-2 buttonChannels ${customerSales.channelSelectedID == item.id? 'button-selected': 'button-no-selected'}`}
                            style={{
                                'margin': '0', 
                                'paddingTop': '2px',
                                'paddingBottom': '2px',
                            }}
                            onClick={()=>{
                                if (customerSales.order.length > 0) {
                                    Swal.fire({
                                        title: '¿Estás seguro que quieres cambiar el canal de venta?',
                                        text: "Si los productos no existen en el canal de venta se eliminarán",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Si deseo cambiar canal de venta'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            dispatch({
                                                type: CUSTOMER_SALES_CHANGE_CHANNEL, 
                                                channel: item, 
                                                order:customerSales.order
                                            });
                                            dispatch({
                                                type: GET_PRICES_FOR_CHANNEL_AND_CATEGORY, 
                                                channelID:customerSales.channelSelectedID,
                                                categoryID:'',
                                            })
                                        }
                                    })
                                }else{
                                    dispatch({
                                        type: CUSTOMER_SALES_CHANGE_CHANNEL, 
                                        channel: item, 
                                        order:customerSales.order
                                    });
                                    dispatch({
                                        type: GET_PRICES_FOR_CHANNEL_AND_CATEGORY, 
                                        channelID:customerSales.channelSelectedID,
                                        categoryID:'',
                                    })
                                }
                            }}
                            >
                            {item.name}
                            </Button>
                    )
                })
                return list;
            }
            return(<></>);
        }
        return(<></>);
    }
    
    if(!hidden){
        return(
            <>
                <Row className="mt-2">
                  <Colxx xss="12">
                    <Channels />
                    <NewList />
                  </Colxx>
                </Row>
            </>
        );
    }
    return(<></>)

};

export default ListChannels;