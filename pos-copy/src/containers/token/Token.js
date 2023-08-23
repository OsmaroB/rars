import React, { useEffect} from "react";
import { useHistory   } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {errorMessage} from 'helpers/messages';

const Token = () =>{

    const cookies = new Cookies();
    const history = useHistory();
    
    const reloadPage = () => {
        if(cookies.get('statusPage') === '0'){
            cookies.set('statusPage', 1, { path: '/' });
            window.location.reload();
        }
    };

    const securityLinks = () => {
        if(localStorage.getItem('roleDetail')){
            if(localStorage.getItem('roleDetail') !== undefined){
                const paths = JSON.parse(localStorage.getItem('roleDetail'));
                const filter = (history.location.pathname).toLowerCase();
                const list = paths.map((element)=>{
                    return element.url === history.location.pathname ? element : {...element, url:''}
                });
                const newList = list.filter(function(element){
                    return (element.url.toLowerCase()).indexOf(filter) !== -1;
                });
                if(newList[0] === undefined){
                    history.goBack();   
                    errorMessage('No tienes permiso para ingresar a esa dirección', 'Sin autorización');
                }
                if(newList[0] === []){
                    history.goBack();   
                }
                try {
                    if(newList[0].status !== 0){
                        history.goBack();   
                    }
                } catch (error) {
                    // console.log(error);
                    errorMessage('No tienes permiso para ingresar a esa dirección', 'Sin autorización');
    
                }
            }
        }else{
            errorMessage('Inicia sesión', 'Sin autorización');
            history.push("/user/login");   
        }
    };

    useEffect(()=>{
        if(cookies.get('userToken') === undefined){
            history.push("/user/login");   
        }
        securityLinks();
        reloadPage();
    },[])

    return(
        <></>
    );

}

export default Token;