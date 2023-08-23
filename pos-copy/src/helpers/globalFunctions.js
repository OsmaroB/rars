import moment from 'moment';
import Cookies from 'universal-cookie';
import { getSalesForDate as getSalesForDateAPI } from 'apis/sales-for-date';
import { warningMessage } from './messages';
const globalFunctions = {};

const cookies = new Cookies();

globalFunctions.logout = () =>{
    localStorage.removeItem('idcashdesk');
    localStorage.removeItem('prettycash');
    localStorage.removeItem('errorPretty');
    cookies.remove('userToken', { path: '/' });
    cookies.remove('userID', { path: '/' });
    cookies.remove('employeeName', { path: '/' });
    cookies.remove('statusPage', { path: '/' });
    localStorage.removeItem('roleDetail');
    localStorage.removeItem('orders');
    localStorage.clear();
}

globalFunctions.clearSpecial = () =>{
    localStorage.removeItem('errorPretty');
    cookies.remove('userToken', { path: '/' });
    cookies.remove('userID', { path: '/' });
    cookies.remove('employeeName', { path: '/' });
    cookies.remove('statusPage', { path: '/' });
    localStorage.removeItem('roleDetail');
    localStorage.removeItem('orders');
}

globalFunctions.CurrentTime = () => {
    

}


globalFunctions.salesForDate = async (date) =>{
    const data = await getSalesForDateAPI({date})
    if(data.length > 0){
        return true
    }else{
        return false
    }
}


globalFunctions.removeFinishCutZ = (paymentMethodsArray, subchannelsArray) => {
    paymentMethodsArray.forEach((pay) => {
        localStorage.removeItem(`cash${pay.name}`);
        localStorage.removeItem(`missing${pay.name}`);
        localStorage.removeItem(`ofmore${pay.name}`);
    });
    subchannelsArray.forEach((pay) => {
        localStorage.removeItem(`chan${pay.name}`);
        localStorage.removeItem(`missing${pay.name}`);
        localStorage.removeItem(`ofmore${pay.name}`);
    });
    localStorage.removeItem(`ofmoreFondo de caja`);
    localStorage.removeItem(`missingFondo de caja`);
    localStorage.removeItem('idcashdesk');
    localStorage.removeItem('prettycash');
};

globalFunctions.limitData = (value, max) =>{
    if(value.length > max){
        warningMessage('',`No puedes colocar mas de ${max} caracteres`);
        return false
    }
    return true;
}

globalFunctions.orderForPosition = (array) =>{
    const newArray = array.sort(function(a, b) {
        let itemA = a.position;
        let itemB = b.position;
        if (itemA < itemB) {
          return -1;
        }
        if (itemA > itemB) {
          return 1;
        }
        return 0;
    });
    return newArray;
}

export default globalFunctions;