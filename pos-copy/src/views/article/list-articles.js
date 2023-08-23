import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmArticle from 'containers/forms/FrmArticle';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_ARTICLE } from "redux/contants";

const ListArticles = () => {

    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_ARTICLE});
    },[]);

    function NewItem(){
        if(articles.addItem){
            return(<>
                <FrmArticle 
                article={{...articles.newItem}}
                isCollapse={{collapse: true}}
                index=''
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(articles.allItems !== undefined){
            const articlesList = (articles.allItems).map((item, index)=>{
                return(
                <>
                    <FrmArticle 
                        isCollapse={{collapse: false}}
                        article={{...item}}
                        key={`list-article-crud-${item.id}-${index}`}
                        index={index+1}
                    />
                </>
                )
            });
            return articlesList;
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

export default ListArticles;