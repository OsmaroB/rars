import React, { useEffect} from "react";
import { useHistory   } from 'react-router-dom';
import {errorMessage} from 'helpers/messages';
import { checkCutzPending as checkCutzPendingAPI } from "apis/cash-desk-closing";
import { useDispatch } from "react-redux";
import { GET_TIKET_CONFIGURATION } from "redux/contants";
import moment from 'moment';


const CutZValid = () =>{
    const history = useHistory();
    const dispatch = useDispatch();

    const validate = async() =>{
        if(localStorage.getItem('tiket-configuration')){
            const nowDate = moment().format('YYYY-MM-DD');
            const data = await checkCutzPendingAPI({
                date:nowDate,
                type:'1',
                cashRegister:JSON.parse(localStorage.getItem('tiket-configuration'))[0]?.cashRegisterNumber
            })
            if(data?.data.length > 0){
                if(data.data[0].status == 1){
                    if(data.data)
                    // history.push('/app/subway/welcome');
                    errorMessage('No se puede realizar ninguna venta ni corte al finzalizar el corte Z','Acción no autorizada')
                }
            }
        }else{
            dispatch({type: GET_TIKET_CONFIGURATION});
            window.location.reload();
        }
    }

    useEffect(()=>{
        validate();
    },[])

    return (<></>)
}

export default CutZValid;


