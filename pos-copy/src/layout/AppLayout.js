import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import globalFunctions from 'helpers/globalFunctions';
import { useSelector } from 'react-redux';
import TopNav from 'containers/navs/Topnav';
import Sidebar from 'containers/navs/Sidebar';
import fullScreen from 'helpers/fullScreen';

const AppLayout = ({ containerClassnames, children, history }) => {

  const customerSales = useSelector(state => state.customerSales);

  // alert('')
  useEffect(()=>{
    console.log(customerSales.cutX);
  },[customerSales.cutX])

  const validateSesion = () => {
    const hourSesion = JSON.parse(localStorage.getItem('hourSesion'));
    const dateSesion = JSON.parse(localStorage.getItem('dateSesion'));
    const finishDate = moment(`${dateSesion} ${hourSesion}`)
    const nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm');
    const res = finishDate.isSame(nowDate);

    const result = moment(`${dateSesion} ${hourSesion}`).diff(nowDate)
    if(res || result < 0){
      globalFunctions.logout();
      history.push('/user/login');
      window.location.reload();
      window.location.reload();
    }
  }
  setInterval(validateSesion,1000)

  return (
    <div id="app-container" className={containerClassnames}
      onMouseEnter={()=>{
        // alert('Hellp');
        // fullScreen.fullScreen();
      }}
      onClick={()=>{
        fullScreen.fullScreen();
      }}
      >
      <TopNav history={history} />
      <Sidebar />
      <main
      onClick={()=>{
        // fullScreen.fullScreen();
      }}
      >
        <div className="container-fluid">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
