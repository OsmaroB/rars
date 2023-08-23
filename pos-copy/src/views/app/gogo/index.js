import { checkCutzPending } from 'apis/cash-desk-closing';
import { errorMessage } from 'helpers/messages';
import { useDispatch } from 'react-redux';
import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { GET_TIKET_CONFIGURATION } from 'redux/contants';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './start')
);
const Gogo = ({ match }) => {
  const dispatch = useDispatch();
  const history=useHistory();
  useEffect(async()=>{
    var yesterday = new Date(Date.now() - 86400000);
    if(localStorage.getItem('tiket-configuration')){
      let check={
        type:1,
        date:yesterday.getFullYear()+"-"+parseInt(yesterday.getMonth()+1)+"-"+yesterday.getDate(),
        cashRegister:JSON.parse(localStorage.getItem('tiket-configuration'))[0].cashRegisterNumber,
      }
      console.log(check.date)
      const getCutPending=await checkCutzPending(check);
      if(localStorage.getItem('roleDetail')){
        const filter = '/app/cut-z';
        const newList = (JSON.parse(localStorage.getItem('roleDetail'))).filter(function(element){
            return (element.url.toLowerCase()).indexOf(filter) !== -1 && element.status == 0;
        });
        if(newList.length>0){
          if(getCutPending.data.length==0){
            errorMessage("Debes finalizar el corte z del día anterior","Error");
            history.push("/app/cut-z")
          }
        }
      }
    }else{
      dispatch({type:GET_TIKET_CONFIGURATION});
    }
  },[])
  return(
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
        <Route
          path={`${match.url}/welcome`}
          render={(props) => <Start {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
}
export default Gogo;
