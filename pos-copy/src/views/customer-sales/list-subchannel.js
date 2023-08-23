import React, {useState} from "react";
import { 
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_SALES_CHANGE_SUBCHANNEL } from '../../redux/contants';
import Swal from "sweetalert2";


const ListSubchannel = (props) => {

    const {channel, subchannels, selected} = props;
    const [dropDownState, setDropDownState] = useState(false);
    const customerSales = useSelector(state => state.customerSales);
    const dispatch = useDispatch();
    
    function Submenu(){
        if(subchannels.allItems !== null || subchannels.allItems !== undefined){
            const filterList = (subchannels.allItems).filter((subchannel)=>{
                return subchannel.channelID == channel.id && subchannel.status == 0;
            })

            const list = filterList.map((subchannel)=>{
                return(
                        <DropdownItem 
                            key={`dropitem-${subchannel.id}`}
                            className={``}
                            onClick={()=>{
                                if(customerSales.order.length > 0){
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
                                            dispatch({type: CUSTOMER_SALES_CHANGE_SUBCHANNEL, changueChannel: subchannel, channel: channel});
                                        }
                                    })
                                }else{
                                    dispatch({type: CUSTOMER_SALES_CHANGE_SUBCHANNEL, changueChannel: subchannel, channel: channel});
                                }
                            }}
                        >
                            {subchannel.name}
                        </DropdownItem>
                )
            })
            return list;
        }
        return(null);
    }

    return(
        <ButtonDropdown
            className={`mt-2`}
            key={`BDCH-${channel.id}`}
            isOpen={dropDownState}
            toggle={() => setDropDownState(!dropDownState)}
        >
            <div className="">
                <DropdownToggle 
                    color="primary"
                    className={`btn buttonChannels btn-sm mx-1 ${selected ? 'button-selected': 'button-no-selected'}`}
                    style={{
                        'margin': '0', 
                        'paddingTop': '2px',
                        'paddingBottom': '2px',
                    }}
                    caret
                >
                    {channel.name}
                </DropdownToggle>
                <DropdownMenu>
                    <Submenu />
                </DropdownMenu>
            </div>
        </ButtonDropdown>
    )
};

export default ListSubchannel;