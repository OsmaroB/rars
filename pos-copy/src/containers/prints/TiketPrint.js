import React, {useEffect} from 'react';
import { 
  Button 
} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { 
    GET_ALL_PRINT, 
    PRINT_TIKET,
} from "redux/contants";

const Example = () => {

  const dispatch = useDispatch();
  const prints = useSelector(state => state.prints);

  useEffect(()=>{
      dispatch({type:GET_ALL_PRINT});
  },[])

  return (
    <div>
      <Button
        color='primary'
        outline
        onClick={()=>{
          dispatch({type:PRINT_TIKET, sale:'', saleDetail:''})
        }}
      >
        Imprimir
      </Button>
    </div>
  );
};

export default Example;